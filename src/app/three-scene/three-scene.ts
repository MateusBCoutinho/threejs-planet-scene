import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  NgZone,
} from '@angular/core';

/**
 * Para dar deploy: ng deploy --base-href=https://MateusBCoutinho.github.io/threejs-planet-scene/
 * Para entrar no site: https://MateusBCoutinho.github.io/threejs-planet-scene/
 * Para alterar o nome da página, alterar no index.html a tag <title>
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.html',
  styleUrls: ['./three-scene.scss'],
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false })
  container!: ElementRef<HTMLDivElement>;

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private controls!: OrbitControls;
  private constellationString = "RITA";
                               

  private planet!: THREE.Mesh;
  private testItem!: THREE.Mesh;
  private chest!: THREE.Object3D;
  private tree!: THREE.Object3D;
  private isNearChest = false;
  private isNearTree = false;
  private collidableObjects: THREE.Mesh[] = [];
  private fireflies!: THREE.Points;
  private firefliesVelocities: THREE.Vector3[] = [];
  private chestAudio!: HTMLAudioElement;
  private atmosphere!: THREE.Mesh;
  private backgroundMusic!: HTMLAudioElement;

  // Player & animation
  private playerModel!: THREE.Object3D;
  private mixer!: THREE.AnimationMixer;
  private animations: { [name: string]: THREE.AnimationAction } = {};
  private currentAction!: THREE.AnimationAction;
  private clock = new THREE.Clock();

  private frameId: number | null = null;

  // Movement keys
  private keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };

  private playerSpeed = 0.08;
  private turnSpeed = 0.05;
  private planetRadius = 8;

  // Photo album data
  private photos = [
    { 
      src: 'assets/pictures/óculos.jpg', 
      caption: 'esta foto ganhou o prémio de foto mais tuff de 2025' 
    },
    { 
      src: 'assets/pictures/wrapped.png', 
      caption: 'O meu Spotify wrapped de 2025, resume bem o meu ano' 
    },
    { 
      src: 'assets/pictures/hand1.jpg', 
      caption: 'Minha mão esquerda, a que segura firme (ainda mais nesse dia)' 
    },
    { 
      src: 'assets/pictures/gato.jpg', 
      caption: 'O gatinho que tu te esqueceste dele no teu caderno :( Agora ele tá aqui contigo' 
    },
    { 
      src: 'assets/pictures/biblioteca.jpg', 
      caption: 'Um dos vários momentos nossos a estudar intensamente na biblioteca' 
    },
    { 
      src: 'assets/pictures/hand2.jpg', 
      caption: 'Quando eu voltei para casa e tu me fizeste este smile e eu tirei foto. Foi naquele dia que disseste para eu não lavar e eu deixei até o dia seguinte' 
    },
    { 
      src: 'assets/pictures/nos1.jpg', 
      caption: 'Esta foto está melhor que aquelas que aparecem no pinterest de couple picture ideas' 
    },
    { 
      src: 'assets/pictures/barrits.jpg', 
      caption: 'Uma das minhas fotos favoritas tuas, apesar de ter sido difícil escolher. És a strawberry blonde mais bonita, elegante, aesthetic, engraçada, inteligente e amiga deste mundo, a minha strawberry blonde. Love you :)' 
    }
  ];
  private currentPhotoIndex = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.createPlanet();
      this.beautifyPlanet();
      this.createAtmosphere();
      this.createItem();
      this.createChest();
      this.createConstellation(this.constellationString, 60); 
      this.loadTree(); // Changed from createItem tree loading to separate method
      this.loadPlayerModel();
      this.setupKeyboardControls();
      this.animate();
      window.addEventListener('resize', this.onWindowResizeBound);
      this.initChestAudio();
      //this.setupBackgroundAudio('assets/audios/Strawberry.mp3');
      this.setupKeyboardControls();
      // --- ADD GLOBAL INTERACTION LISTENER ---
        window.addEventListener('mousedown', this.handleFirstInteractionBound, { once: true });
        window.addEventListener('keydown', this.handleFirstInteractionBound, { once: true });
        // ---------------------------------------
        
        this.animate();
        window.addEventListener('resize', this.onWindowResizeBound);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResizeBound);
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    this.controls?.dispose();
    this.renderer?.dispose();
    this.closePhotoAlbumModal();
    this.stopChestAudio();
    // --- CLEAN UP ---
    window.removeEventListener('mousedown', this.handleFirstInteractionBound);
    window.removeEventListener('keydown', this.handleFirstInteractionBound);
    // ----------------
  }

  // The bound handler and the method itself:
private handleFirstInteractionBound = this.handleFirstInteraction.bind(this);

private handleFirstInteraction() {
    if (this.backgroundMusic && this.backgroundMusic.paused) {
        this.backgroundMusic.play().catch(error => {
             console.error("Music play failed on interaction:", error);
        });
        
        // Remove the listeners after successful interaction
        window.removeEventListener('mousedown', this.handleFirstInteractionBound);
        window.removeEventListener('keydown', this.handleFirstInteractionBound);
    }
}

  /** ----------------- AUDIO SETUP ----------------- */
private setupBackgroundAudio(url: string) {
    this.backgroundMusic = new Audio(url);
    this.backgroundMusic.loop = true; // Set to play on repeat
    this.backgroundMusic.volume = 0.3; // Adjust volume as needed (0.0 to 1.0)

    // Attempt to play immediately (may fail due to browser policies)
    const playPromise = this.backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay failed, log a message and rely on user interaction later
            console.log("Autoplay blocked. Music will start on first key press.");
        });
    }
}

  /** ----------------- THREE INIT ----------------- */
  private initThree() {
    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
        this.scene.background = this.createGradientBackground();


    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.set(0, 20, 20);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(10, 20, 10);
    light.castShadow = true;
    this.scene.add(light);

    const amb = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(amb);
    this.setupEnhancedLighting();
  }

   /** ----------------- ENHANCED LIGHTING SETUP ----------------- */
  private setupEnhancedLighting() {
    // Main directional light (sun/moon)
    const mainLight = new THREE.DirectionalLight(0xfff4e6, 1.5);
    mainLight.position.set(30, 50, 30);
    mainLight.castShadow = true;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    this.scene.add(mainLight);

    // Secondary directional light for fill
    const fillLight = new THREE.DirectionalLight(0x4466ff, 0.4);
    fillLight.position.set(-20, 30, -20);
    this.scene.add(fillLight);

    // Warm ambient light
    const warmAmbient = new THREE.AmbientLight(0xfff4e6, 0.15);
    this.scene.add(warmAmbient);

    // Cool ambient light
    const coolAmbient = new THREE.AmbientLight(0x4466ff, 0.1);
    this.scene.add(coolAmbient);

    // Hemisphere light for sky/ground lighting
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x3b8a3b, 0.6);
    this.scene.add(hemiLight);

    // Add some point lights around the scene for interest
    this.addDecorativeLights();
  }

   /** ----------------- ADD DECORATIVE LIGHTS ----------------- */
  private addDecorativeLights() {
    // Lights around the planet
    const lightPositions = [
      { position: new THREE.Vector3(15, 5, 15), color: 0xffaa88, intensity: 0.8 },
      { position: new THREE.Vector3(-15, 8, 10), color: 0x88aaff, intensity: 0.6 },
      { position: new THREE.Vector3(10, 12, -15), color: 0xaaff88, intensity: 0.7 },
      { position: new THREE.Vector3(-10, 3, -12), color: 0xff88ff, intensity: 0.5 }
    ];

    lightPositions.forEach(lightData => {
      const light = new THREE.PointLight(lightData.color, lightData.intensity, 50);
      light.position.copy(lightData.position);
      light.decay = 2;
      this.scene.add(light);

      // Add visible glow around lights
      const glowGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: lightData.color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(lightData.position);
      this.scene.add(glow);
    });
  }


   /** ----------------- CREATE GRADIENT BACKGROUND ----------------- */
  private createGradientBackground(): THREE.Color {
    // Create a canvas for gradient background
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient from deep blue to purple
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#0a0a2a');
    gradient.addColorStop(0.5, '#1a1a4a');
    gradient.addColorStop(1, '#7b6baeff');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.Color(0x101520); // Fallback color
  }

   /** ----------------- CREATE ATMOSPHERE ----------------- */
  private createAtmosphere() {
    const atmosphereGeometry = new THREE.SphereGeometry(this.planetRadius * 1.4, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      roughness: 0,
      metalness: 0,
      thickness: 1.5
    });
    
    this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    this.scene.add(this.atmosphere);

    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(this.planetRadius * 1.3, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4466ff,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.scene.add(glow);
  }

  /** ----------------- CREATE SPARKLING LIGHTS/FIREFLIES ----------------- */
  private createFireflies(count: number = 30): THREE.Points {
    const particles = new Float32Array(count * 3);
    this.firefliesVelocities = [];
    
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 1.5 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particles[i] = radius * Math.sin(phi) * Math.cos(theta);
      particles[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particles[i + 2] = radius * Math.cos(phi);
      
      this.firefliesVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      ));
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xffff99,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.fireflies = new THREE.Points(geometry, material);
    return this.fireflies;
  }

  /** ----------------- UPDATE FIREFLIES ANIMATION ----------------- */
  private updateFireflies() {
    if (!this.fireflies) return;
    
    const positionAttribute = this.fireflies.geometry.getAttribute('position');
    const positions = positionAttribute.array as Float32Array;
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < positions.length; i += 3) {
      const velocityIndex = Math.floor(i / 3);
      const velocity = this.firefliesVelocities[velocityIndex];
      
      positions[i] += Math.sin(time + i) * 0.002 + velocity.x;
      positions[i + 1] += Math.cos(time * 0.7 + i) * 0.002 + velocity.y;
      positions[i + 2] += Math.sin(time * 0.5 + i * 0.7) * 0.002 + velocity.z;
      
      const radius = Math.sqrt(
        positions[i] * positions[i] + 
        positions[i + 1] * positions[i + 1] + 
        positions[i + 2] * positions[i + 2]
      );
      
      if (radius > 2.5) {
        positions[i] *= 0.9;
        positions[i + 1] *= 0.9;
        positions[i + 2] *= 0.9;
      }
    }
    
    positionAttribute.needsUpdate = true;
    
    const material = this.fireflies.material as THREE.PointsMaterial;
    material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
  }

  /** ----------------- CONSTELLATION GENERATOR ----------------- */
  private createConstellation(text: string, skyDistance: number) {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const starPositions: THREE.Vector3[] = [];
    const step = 6;
    
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        if (data[index] > 100) {
          const u = (x / canvas.width) - 0.5;
          const v = (y / canvas.height) - 0.5;
          const angleX = u * Math.PI * 0.8;
          const angleY = v * Math.PI * 0.3;
          const pos = new THREE.Vector3(0, 0, -skyDistance);
          pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), angleY - Math.PI/6);
          pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleX);
          pos.x += (Math.random() - 0.5) * 0.5;
          pos.y += (Math.random() - 0.5) * 0.5;
          pos.z += (Math.random() - 0.5) * 0.5;
          starPositions.push(pos);
        }
      }
    }

    const starGeo = new THREE.BufferGeometry().setFromPoints(starPositions);
    const starMat = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.8,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeo, starMat);
    this.scene.add(stars);

    const linePoints: THREE.Vector3[] = [];
    const maxConnectDist = 4.0;

    starPositions.forEach((p1, i) => {
      for (let j = i + 1; j < Math.min(i + 10, starPositions.length); j++) {
        const p2 = starPositions[j];
        if (p1.distanceTo(p2) < maxConnectDist) {
          linePoints.push(p1);
          linePoints.push(p2);
        }
      }
    });

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(lines);

    stars.rotation.z = Math.PI;
    lines.rotation.z = Math.PI;
    const repositionOffset = Math.PI / 2;
    stars.rotation.y = repositionOffset;
    lines.rotation.y = repositionOffset;
  }

  /** ----------------- CREATE PLANET ----------------- */
  private createPlanet() {
    const geo = new THREE.SphereGeometry(this.planetRadius, 64, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x226622,
      roughness: 0.8,
      flatShading: false,
    });

    const tex = this.createGroundTexture();
    mat.map = tex;
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
    mat.map.repeat.set(2, 2);

    this.planet = new THREE.Mesh(geo, mat);
    this.planet.receiveShadow = true;
    this.scene.add(this.planet);
    this.collidableObjects.push(this.planet);
  }

  private beautifyPlanet() {
    this.addEnvironmentDecor();
    this.addStars(100);
    this.addSurfacePebbles(120);
    this.addSurfaceBushes(12);
  }

  private createGroundTexture(): THREE.Texture {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#3b8a3b';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = 6 + Math.random() * 40;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      const g = Math.floor(80 + Math.random() * 60);
      const alpha = 0.06 + Math.random() * 0.12;
      grd.addColorStop(0, `rgba(${g},${120 + Math.random()*60},${g},${alpha})`);
      grd.addColorStop(1, `rgba(59,138,59,0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let i = 0; i < 4000; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  private addSurfacePebbles(count = 80) {
    const group = new THREE.Group();
    const geo = new THREE.SphereGeometry(0.06, 6, 6);
    const mat = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.95 });
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const peb = new THREE.Mesh(geo, mat);
      const offset = 0.03 + Math.random() * 0.06;
      peb.position.copy(dir.multiplyScalar(this.planetRadius + offset));
      peb.scale.setScalar(0.6 + Math.random() * 1.2);
      peb.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(peb);
    }
    this.scene.add(group);
  }

  private addSurfaceBushes(count = 8) {
    const group = new THREE.Group();
    const greens = [0x2e7d32, 0x2b8a3a, 0x3b8a3b];
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const bush = new THREE.Group();
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.08, 6),
        new THREE.MeshStandardMaterial({ color: 0x6b4b2a })
      );
      base.position.y = 0.04;
      bush.add(base);
      const levels = 3;
      for (let l = 0; l < levels; l++) {
        const s = 0.7 - l * 0.18 + Math.random() * 0.12;
        const g = new THREE.SphereGeometry(s, 8, 6);
        const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: greens[Math.floor(Math.random() * greens.length)], roughness: 0.9 }));
        m.position.y = 0.15 + l * 0.18;
        bush.add(m);
      }
      bush.position.copy(dir.multiplyScalar(this.planetRadius + 0.02));
      bush.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(bush);
    }
    this.scene.add(group);
  }

  private addEnvironmentDecor() {
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x444444, 0.35);
    this.scene.add(hemi);
  }

  private addStars(count = 600) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    const minDist = this.planetRadius * 5;
    const maxDist = this.planetRadius * 20;

    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const d = minDist + Math.random() * (maxDist - minDist);
      v.multiplyScalar(d);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
      const t = Math.random();
      if (t < 0.6) color.setHex(0xffffff);
      else if (t < 0.85) color.setHex(0xfff4e6);
      else color.setHex(0xffe0e0);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.8,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const points = new THREE.Points(geom, mat);
    this.scene.add(points);
  }

  private createItem() {
    const geo = new THREE.BoxGeometry(3, 0.2, 3);
    const mat = new THREE.MeshStandardMaterial({ color: 0x292b21 });
    this.testItem = new THREE.Mesh(geo, mat);
    this.testItem.castShadow = true;
    this.testItem.position.set(10, this.planetRadius + 0.5, 0); 
    this.scene.add(this.testItem);

    const loader = new GLTFLoader();
    loader.load('assets/models/Billboard.glb', (gltf) => {
      const billboard = gltf.scene;
      billboard.scale.set(0.9, 0.9, 0.9);
      billboard.position.copy(this.testItem.position);
      billboard.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
      billboard.position.y += 0.5;
      this.scene.add(billboard);
      this.collidableObjects.push(this.testItem);
    });

    loader.load('assets/models/Cat.glb', (gltf) => {
      const cat = gltf.scene;
      cat.scale.set(0.2, 0.2, 0.2);
      cat.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
      cat.position.y += 0.5;
      const catDir = new THREE.Vector3(1, 1, 1).normalize();
      cat.position.copy(catDir.multiplyScalar(this.planetRadius-0.15));
      cat.lookAt(new THREE.Vector3(0, 0, 0));
      cat.castShadow = true;
      cat.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      cat.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI-1);
      this.scene.add(cat);
    });

     loader.load('assets/models/Bed2.glb', (gltf) => {
      const bed = gltf.scene;
      bed.scale.set(2, 2, 2);
      const bedDir = new THREE.Vector3(-1, -1, -1).normalize();
      bed.position.copy(bedDir.multiplyScalar(this.planetRadius- 0.15));
      bed.lookAt(new THREE.Vector3(0, 0, 0));
      bed.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      bed.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI-5);
      bed.castShadow = true;
      this.scene.add(bed);
    });

    
     loader.load('assets/models/prada_bag.glb', (gltf) => {
      const bag = gltf.scene;
      bag.scale.set(10, 10, 10);
      const bagDir = new THREE.Vector3(0, -0.3, -3).normalize();
      bag.position.copy(bagDir.multiplyScalar(this.planetRadius+ 0.25));
      bag.lookAt(new THREE.Vector3(0, 0, 0));
      bag.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      bag.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/3);
      bag.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/10);
      bag.castShadow = true;
      this.scene.add(bag);
    });

     loader.load('assets/models/Temple.glb', (gltf) => {
      const temple = gltf.scene;
      temple.scale.set(3, 3, 3);
      const templeDir = new THREE.Vector3(0, 0.3, 3).normalize();
      temple.position.copy(templeDir.multiplyScalar(this.planetRadius- 1));
      temple.lookAt(new THREE.Vector3(0, 0, 0));
      temple.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      temple.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/3);
      temple.castShadow = true;
      this.scene.add(temple);
    });

     loader.load('assets/models/Ibanez1.glb', (gltf) => {
      const guitar1 = gltf.scene;
      guitar1.scale.set(2, 2, 2);
      const guitar1Dir = new THREE.Vector3(-1, -0.2, 0.13).normalize();
      guitar1.position.copy(guitar1Dir.multiplyScalar(this.planetRadius+ 0.15));
      guitar1.lookAt(new THREE.Vector3(0, 0, 0));
      guitar1.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2+0.05);
      guitar1.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/3);
      guitar1.castShadow = true;
      this.scene.add(guitar1);
    });

      loader.load('assets/models/Strat.glb', (gltf) => {
      const guitar2 = gltf.scene;
      guitar2.scale.set(2, 2, 2);
      const guitar1Dir = new THREE.Vector3(-1, -0.2, -0.13).normalize();
      guitar2.position.copy(guitar1Dir.multiplyScalar(this.planetRadius-0.21));
      guitar2.lookAt(new THREE.Vector3(0, 0, 0));
      guitar2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -3);
      guitar2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 1.66);
      guitar2.castShadow = true;
      this.scene.add(guitar2);
    });

     loader.load('assets/models/antique_table.glb', (gltf) => {
      const table = gltf.scene;
      table.scale.set(0.07, 0.07, 0.07);
      const tableDir = new THREE.Vector3(4, 0,0).normalize();
      table.position.copy(tableDir.multiplyScalar(this.planetRadius-0.21));
      table.lookAt(new THREE.Vector3(0, 0, 0));
      table.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      table.castShadow = true;
      this.scene.add(table);
    });
       loader.load('assets/models/francesinha.glb', (gltf) => {
      const francesinha = gltf.scene;
      francesinha.scale.set(2,2, 2);
      const francesinhaDir = new THREE.Vector3(16, -3,0).normalize();
      francesinha.position.copy(francesinhaDir.multiplyScalar(this.planetRadius+14.6));
      francesinha.lookAt(new THREE.Vector3(0, 0, 0));
      francesinha.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      francesinha.castShadow = true;
      this.scene.add(francesinha);
    });
       loader.load('assets/models/sushi.glb', (gltf) => {
      const sushi = gltf.scene;
      sushi.scale.set(2,2, 2);
      const sushiDir = new THREE.Vector3(16, 1,0).normalize();
      sushi.position.copy(sushiDir.multiplyScalar(this.planetRadius+1.35));
      sushi.lookAt(new THREE.Vector3(0, 0, 0));
      sushi.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      sushi.castShadow = true;
      this.scene.add(sushi);
    });

       loader.load('assets/models/lamp_post.glb', (gltf) => {
      const lamp_post = gltf.scene;
      lamp_post.scale.set(0.05,0.05, 0.05);
      const lamp_postDir = new THREE.Vector3(1, 1,-1).normalize();
      lamp_post.position.copy(lamp_postDir.multiplyScalar(this.planetRadius-0.15));
      lamp_post.lookAt(new THREE.Vector3(0, 0, 0));
      lamp_post.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      lamp_post.castShadow = true;
      this.scene.add(lamp_post);
    });
        loader.load('assets/models/lamp_post.glb', (gltf) => {
      const lamp_post = gltf.scene;
      lamp_post.scale.set(0.05,0.05, 0.05);
      const lamp_postDir = new THREE.Vector3(-1,-2, -4).normalize();
      lamp_post.position.copy(lamp_postDir.multiplyScalar(this.planetRadius-0.15));
      lamp_post.lookAt(new THREE.Vector3(0, 0, 0));
      lamp_post.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      lamp_post.castShadow = true;
      this.scene.add(lamp_post);
    });
     // Example for one of your lamp post loads:

loader.load('assets/models/lamp_post.glb', (gltf) => {
    const lamp_post = gltf.scene;
    lamp_post.scale.set(0.05, 0.05, 0.05);

    // 1. Position and Orientation of the Lamp Post
    const lamp_postDir = new THREE.Vector3(-1, -0.3, 0.2).normalize();
    // The position is calculated based on the directory vector and planet radius
    const lampPosition = lamp_postDir.clone().multiplyScalar(this.planetRadius - 0.15); 
    lamp_post.position.copy(lampPosition);
    
    // Rotation and shadowing (ensure these are applied correctly)
    lamp_post.lookAt(new THREE.Vector3(0, 0, 0));
    lamp_post.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
    lamp_post.castShadow = true;
    this.scene.add(lamp_post);

    // --- 2. ADD LIGHT SOURCE (SPOTLIGHT) ---
    
    const lampLight = new THREE.SpotLight(0xffcc66, 20); // Color, Intensity
    lampLight.position.copy(lampPosition);
    
    // Offset the light position to the physical location of the lamp bulb
    // This value depends on the GLB model's geometry and scale (may need adjustment)
    const lightOffset = new THREE.Vector3(0, 0.5, 0); 
    
    // Rotate the offset vector by the lamp post's rotation to align it properly
    lamp_post.updateWorldMatrix(true, true);
    lightOffset.applyQuaternion(lamp_post.quaternion); 
    
    lampLight.position.add(lightOffset);

    // Configure the light's target to point towards the ground
    // Use the lamp post's down vector as the target direction
    const target = new THREE.Object3D();
    
    // The target is positioned below the light, aiming at the ground
    target.position.copy(lampLight.position);
    target.position.addScaledVector(lamp_post.up.clone().negate(), 5); // Point 5 units down
    lampLight.target = target;

    // SpotLight properties for a realistic beam
    lampLight.angle = Math.PI / 8;  // Narrow beam
    lampLight.penumbra = 0.5;      // Soft edge
    lampLight.distance = 25;       // Max distance light travels

    // Shadow properties (requires renderer.shadowMap.enabled = true)
    lampLight.castShadow = true;

    lampLight.shadow.camera.near = 0.1;
    lampLight.shadow.camera.far = 30;
    lampLight.shadow.mapSize.width = 1024;
    lampLight.shadow.mapSize.height = 1024;

    this.scene.add(lampLight);
    this.scene.add(lampLight.target);
    // ----------------------------------------
});

    // Removed tree loading from here - moved to separate method
  }

  /** ----------------- TREE LOADING WITH FIREFLIES ----------------- */
  private loadTree() {
    const loader = new GLTFLoader();
    loader.load('assets/models/Tree.glb', (gltf) => {
      const tree = gltf.scene;
      tree.scale.set(0.6, 0.6, 0.6);
      const treeDir = new THREE.Vector3(0, -8, 0).normalize();
      tree.position.copy(treeDir.multiplyScalar(this.planetRadius - 0.15));
      tree.lookAt(new THREE.Vector3(0, 0, 0));
      tree.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      tree.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI-5);
      tree.castShadow = true;
      
      this.tree = tree;
      
      // Add fireflies around the tree
      const fireflies = this.createFireflies(50);
      tree.add(fireflies);
      
      this.scene.add(tree);
      
      // Add some ambient sparkles around the tree
      this.addMagicSparkles(tree.position);
      
      console.log('Tree loaded with fireflies');
    }, undefined, (error) => {
      console.error('Error loading tree:', error);
    });
  }

  /** ----------------- INITIALIZE CHEST AUDIO ----------------- */
private initChestAudio() {
  this.chestAudio = new Audio('assets/audios/RadioheadGuitar.mp4');
  this.chestAudio.preload = 'auto';
  this.chestAudio.volume = 0.5; // Set volume to 50%
  this.chestAudio.loop = false; // Don't loop, play once
}

  /** ----------------- ADD MAGIC SPARKLES ----------------- */
  private addMagicSparkles(position: THREE.Vector3) {
    const sparkleCount = 15;
    const sparkles = new THREE.Group();
    
    for (let i = 0; i < sparkleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.05, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const sparkle = new THREE.Mesh(geometry, material);
      
      const radius = 1.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      sparkle.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      sparkles.add(sparkle);
    }
    
    sparkles.position.copy(position);
    this.scene.add(sparkles);
  }

  private createChest() {
    const chest = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(0.5, 0.2, 0.35);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.2;
    chest.add(body);
    this.collidableObjects.push(body);

    const lidGeo = new THREE.BoxGeometry(0.52, 0.1, 0.37);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.8 });
    const lid = new THREE.Mesh(lidGeo, lidMat);
    lid.position.y = 0.35;
    chest.add(lid);
    this.collidableObjects.push(lid);

    const bandGeo = new THREE.BoxGeometry(0.54, 0.05, 0.03);
    const bandMat = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.3 });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = 0.2;
    chest.add(band);
    this.collidableObjects.push(band);

    const chestDir = new THREE.Vector3(-1, -0.2, 0).normalize();
    chest.position.copy(chestDir.multiplyScalar(this.planetRadius-0.15));
    chest.lookAt(new THREE.Vector3(0, 0, 0));
    chest.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
    chest.castShadow = true;
    this.chest = chest;
    this.chest.name = 'chest';
    this.scene.add(this.chest);
  }

  private loadPlayerModel() {
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/Animated_Woman.glb',
      (gltf) => {
        this.playerModel = gltf.scene;
        this.playerModel.scale.set(1, 1, 1);
        this.playerModel.position.set(0, this.planetRadius, 0);
        this.playerModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
          }
        });
        this.scene.add(this.playerModel);
        this.mixer = new THREE.AnimationMixer(this.playerModel);
        gltf.animations.forEach((clip) => {
          const action = this.mixer.clipAction(clip);
          this.animations[clip.name] = action;
        });
        const animNames = Object.keys(this.animations);
        if (animNames.length > 4) {
          this.playAnimation(animNames[4]); 
        } else if (animNames.length > 0) {
            this.playAnimation(animNames[0]);
        }
      },
      undefined,
      (err) => console.error('Failed to load GLB:', err)
    );
  }

  private playAnimation(name: string) {
    const action = this.animations[name];
    if (!action || this.currentAction === action) return;
    this.currentAction?.fadeOut(0.2);
    action.reset().fadeIn(0.2).play();
    this.currentAction = action;
  }

  private updatePlayerMovement() {
    if (!this.playerModel) return;
    const animNames = Object.keys(this.animations);
    let isMoving = false;
    if (this.keys.left) {
      this.playerModel.rotateY(this.turnSpeed);
      isMoving = true;
    }
    if (this.keys.right) {
      this.playerModel.rotateY(-this.turnSpeed);
      isMoving = true;
    }
    if (this.keys.forward) {
      this.playerModel.translateZ(this.playerSpeed);
      isMoving = true;
    }
    if (this.keys.backward) {
      this.playerModel.translateZ(-this.playerSpeed);
      isMoving = true;
    }
    if (isMoving || true) {
        const currentPos = this.playerModel.position.clone();
        currentPos.normalize().multiplyScalar(this.planetRadius); 
        this.playerModel.position.copy(currentPos);
        const up = this.playerModel.position.clone().normalize();
        const axis = new THREE.Vector3(1, 0, 0); 
        const playerUp = new THREE.Vector3(0, 1, 0); 
        playerUp.applyQuaternion(this.playerModel.quaternion);
        const alignQuat = new THREE.Quaternion().setFromUnitVectors(playerUp, up);
        this.playerModel.quaternion.premultiply(alignQuat);
    }
    if (this.keys.forward) {
       this.playAnimation(animNames[16] || 'Run'); 
    } else if (this.keys.backward) {
      this.playAnimation(animNames[17] || 'Run_Back');
    } else {
        if(animNames.length > 4) this.playAnimation(animNames[4]);
    }
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    if (this.mixer) this.mixer.update(delta);
    this.updatePlayerMovement();
    this.updateFireflies();
    this.checkChestProximity();
    this.checkTreeProximity();
    if (this.playerModel && this.controls) {
        this.controls.target.copy(this.playerModel.position);
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private setupKeyboardControls() {
    let attemptedMusicStart = false;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') this.keys.forward = true;
      if (e.key === 'ArrowDown' || e.key === 's') this.keys.backward = true;
      if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = true;
      if (e.key === 'o' || e.key === 'O') {
        if (this.isNearChest) this.showCongratsModal();
        if (this.isNearTree) this.showPhotoAlbumModal();
      }
    });

    if (!attemptedMusicStart && this.backgroundMusic) {
            this.backgroundMusic.play().catch(err => {
                // If it fails here, the user likely has sound disabled
                console.error("Failed to play background music on user input:", err);
            });
            attemptedMusicStart = true;
        }
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') this.keys.forward = false;
      if (e.key === 'ArrowDown' || e.key === 's') this.keys.backward = false;
      if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
    });
  }

  private checkChestProximity() {
    if (!this.playerModel || !this.chest) {
      this.isNearChest = false;
      return;
    }
    const dist = this.playerModel.position.distanceTo(this.chest.position);
    this.isNearChest = dist < 2.5;
  }

  private checkTreeProximity() {
    if (!this.playerModel || !this.tree) {
      this.isNearTree = false;
      return;
    }
    const dist = this.playerModel.position.distanceTo(this.tree.position);
    this.isNearTree = dist < 3.0;
  }

  /** ----------------- PHOTO ALBUM MODAL ----------------- */
  private showPhotoAlbumModal() {
    if (document.getElementById('photo-album-modal')) return;
    
    this.currentPhotoIndex = 0;
    
    const modal = document.createElement('div');
    modal.id = 'photo-album-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.85); display: flex; align-items: center;
      justify-content: center; z-index: 1000; font-family: Arial, sans-serif;
      backdrop-filter: blur(5px);
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 30px; border-radius: 15px; text-align: center;
      max-width: 800px; width: 90%; max-height: 90vh;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex; flex-direction: column;
      overflow-y: auto;
    `;
    
    const title = document.createElement('h1');
    title.textContent = '📸 Memory Album';
    title.style.cssText = `
      color: #fff; font-size: 2.2em; margin: 0 0 20px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      font-weight: 300; letter-spacing: 1px;
    `;
    
    const photoContainer = document.createElement('div');
    photoContainer.style.cssText = `
      margin: 20px 0; min-height: 400px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.3); border-radius: 10px;
      padding: 20px; position: relative;
    `;
    
    const photo = document.createElement('img');
    photo.id = 'album-photo';
    photo.style.cssText = `
      max-width: 100%; max-height: 400px;
      border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4);
      object-fit: contain;
    `;
    
    const caption = document.createElement('p');
    caption.id = 'album-caption';
    caption.style.cssText = `
      color: #ccc; font-size: 1.1em; margin: 20px 0 30px 0;
      line-height: 1.6; padding: 0 20px;
      min-height: 60px;
    `;
    
    const navContainer = document.createElement('div');
    navContainer.style.cssText = `
      display: flex; justify-content: center; align-items: center;
      gap: 20px; margin-top: 10px;
    `;
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&larr; Previous';
    prevBtn.style.cssText = `
      background: rgba(255, 255, 255, 0.1); color: white; border: none;
      padding: 12px 25px; font-size: 1em; border-radius: 8px;
      cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    prevBtn.onmouseover = () => prevBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    prevBtn.onmouseout = () => prevBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    
    const counter = document.createElement('span');
    counter.id = 'photo-counter';
    counter.style.cssText = `
      color: #fff; font-size: 1.1em; min-width: 100px;
    `;
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = 'Next &rarr;';
    nextBtn.style.cssText = `
      background: rgba(255, 255, 255, 0.1); color: white; border: none;
      padding: 12px 25px; font-size: 1em; border-radius: 8px;
      cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    nextBtn.onmouseover = () => nextBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    nextBtn.onmouseout = () => nextBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Album';
    closeBtn.style.cssText = `
      background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
      color: white; border: none; padding: 12px 40px;
      font-size: 1.1em; border-radius: 8px; cursor: pointer;
      transition: transform 0.3s; margin-top: 30px;
      align-self: center;
    `;
    closeBtn.onmouseover = () => closeBtn.style.transform = 'scale(1.05)';
    closeBtn.onmouseout = () => closeBtn.style.transform = 'scale(1)';
    
    const updatePhoto = () => {
      const currentPhoto = this.photos[this.currentPhotoIndex];
      photo.src = currentPhoto.src;
      caption.textContent = currentPhoto.caption;
      counter.textContent = `${this.currentPhotoIndex + 1} / ${this.photos.length}`;
      
      prevBtn.disabled = this.currentPhotoIndex === 0;
      nextBtn.disabled = this.currentPhotoIndex === this.photos.length - 1;
      prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
      nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    };
    
    prevBtn.onclick = () => {
      if (this.currentPhotoIndex > 0) {
        this.currentPhotoIndex--;
        updatePhoto();
      }
    };
    
    nextBtn.onclick = () => {
      if (this.currentPhotoIndex < this.photos.length - 1) {
        this.currentPhotoIndex++;
        updatePhoto();
      }
    };
    
    closeBtn.onclick = () => this.closePhotoAlbumModal();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'Escape') this.closePhotoAlbumModal();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    (modal as any)._keyHandler = handleKeyDown;
    
    photoContainer.appendChild(photo);
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(counter);
    navContainer.appendChild(nextBtn);
    
    content.appendChild(title);
    content.appendChild(photoContainer);
    content.appendChild(caption);
    content.appendChild(navContainer);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    updatePhoto();
  }

  private closePhotoAlbumModal() {
    const modal = document.getElementById('photo-album-modal');
    if (modal) {
      const handler = (modal as any)._keyHandler;
      if (handler) {
        window.removeEventListener('keydown', handler);
      }
      modal.remove();
    }
  }

 private showCongratsModal() {

  if (this.backgroundMusic) {
        this.backgroundMusic.pause(); // Stop the background music
    }
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7); display: flex; align-items: center;
    justify-content: center; z-index: 1000; font-family: Arial, sans-serif;
  `;
  const content = document.createElement('div');
  content.style.cssText = `
    background: white; padding: 40px; border-radius: 10px; text-align: center;
    max-width: 500px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;
  const title = document.createElement('h1');
  title.textContent = '🎉 PARABÉNS! 🎉';
  title.style.cssText = `color: #333; font-size: 2.5em; margin: 0 0 20px 0;`;
  const message = document.createElement('p');
  message.textContent = 'Uma lembrança minha para os teus 21 anos :) Aproveita a música e o momento!';
  message.style.cssText = `color: #666; font-size: 1.2em; margin: 0 0 30px 0;`;
  
  // Add audio controls
  const audioControls = document.createElement('div');
  audioControls.style.cssText = `margin: 20px 0;`;
  
  const volumeControl = document.createElement('input');
  volumeControl.type = 'range';
  volumeControl.min = '0';
  volumeControl.max = '100';
  volumeControl.value = '50';
  volumeControl.style.cssText = `width: 100%; margin: 10px 0;`;
  volumeControl.oninput = (e) => {
    const target = e.target as HTMLInputElement;
    this.chestAudio.volume = parseInt(target.value) / 100;
  };
  
  audioControls.appendChild(document.createTextNode('Volume: '));
  audioControls.appendChild(volumeControl);
  
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.cssText = `
    background: #4CAF50; color: white; border: none; padding: 10px 30px;
    font-size: 1em; border-radius: 5px; cursor: pointer; transition: background 0.3s;
  `;
  
  // Handle close button click
  closeBtn.onclick = () => {
    this.stopChestAudio(); // Stop audio when closing
    modal.remove();
    if (this.backgroundMusic) {
             this.backgroundMusic.play();
        }
  };
  
  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(audioControls);
  content.appendChild(closeBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // Play audio when modal opens
  this.playChestAudio();
}

/** ----------------- PLAY CHEST AUDIO ----------------- */
private playChestAudio() {
  if (this.chestAudio) {
    this.chestAudio.currentTime = 0; // Restart from beginning
    this.chestAudio.play().catch(e => {
      console.warn('Audio playback failed:', e);
      // Autoplay might be blocked by browser policy
      // Show a play button to user
      this.showAudioPlayButton();
    });
  }
}

/** ----------------- STOP CHEST AUDIO ----------------- */
private stopChestAudio() {
  if (this.chestAudio) {
    this.chestAudio.pause();
    this.chestAudio.currentTime = 0;
  }
}

/** ----------------- SHOW AUDIO PLAY BUTTON (if autoplay blocked) ----------------- */
private showAudioPlayButton() {
  // Optional: Add a play button if autoplay is blocked
  const audioControls = document.querySelector('[style*="margin: 20px 0"]');
  if (audioControls) {
    const playBtn = document.createElement('button');
    playBtn.textContent = '▶ Play Celebration Music';
    playBtn.style.cssText = `
      background: #2196F3; color: white; border: none; padding: 10px 20px;
      font-size: 0.9em; border-radius: 5px; cursor: pointer; margin: 10px 0;
    `;
    playBtn.onclick = () => {
      this.chestAudio.play();
      playBtn.remove();
    };
    audioControls.appendChild(playBtn);
  }
}


  private onWindowResizeBound = this.onWindowResize.bind(this);
  private onWindowResize() {
    if (!this.container) return;
    const el = this.container.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}