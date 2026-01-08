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
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.html',
  styleUrls: ['./three-scene.scss'],
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) container!: ElementRef<HTMLDivElement>;

  // --- Core Three.js Components ---
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private controls!: OrbitControls;
  private clock = new THREE.Clock();
  private frameId: number | null = null;
  private collidableObjects: THREE.Mesh[] = [];


  // --- Scene Objects ---
  private planet!: THREE.Mesh;
  private atmosphere!: THREE.Mesh;
  private chest!: THREE.Object3D;
  private tree!: THREE.Object3D;
  
  // --- Player & Animation ---
  private playerModel!: THREE.Object3D;
  private mixer!: THREE.AnimationMixer;
  private secondaryMixer?: THREE.AnimationMixer;
  private animations: { [name: string]: THREE.AnimationAction } = {};
  private currentAction!: THREE.AnimationAction;
  
  // --- Audio System ---
  private backgroundMusic!: HTMLAudioElement;
  private chestAudio!: HTMLAudioElement;
  private currentSongIndex = 0;
  private attemptedMusicStart = false;
  // FIX: Updated paths to serve from root assets folder
  private playlist: string[] = [
    'assets/audios/song.m4a',
    'assets/audios/Strawberry.mp3'
  ];

  // --- Interaction State ---
  private isNearChest = false;
  private isNearTree = false;
  private proximityLabels: { model: THREE.Object3D, element: HTMLElement }[] = [];
  
  // --- Constants ---
  private readonly planetRadius = 8;
  private readonly playerSpeed = 0.08;
  private readonly turnSpeed = 0.05;
  private readonly constellationString = "RITA";
  
  // --- Controls ---
  private keys = { forward: false, backward: false, left: false, right: false };

  // --- Data ---
  private photos = [
    { src: 'assets/pictures/óculos.jpg', caption: 'esta foto ganhou o prémio de foto mais tuff de 2025' },
    { src: 'assets/pictures/wrapped.png', caption: 'O meu Spotify wrapped de 2025, resume bem o meu ano' },
    { src: 'assets/pictures/hand1.jpg', caption: 'Minha mão esquerda, a que segura firme (ainda mais nesse dia)' },
    { src: 'assets/pictures/gato.jpg', caption: 'O gatinho que tu te esqueceste dele no teu caderno :( Agora ele tá aqui contigo' },
    { src: 'assets/pictures/biblioteca.jpg', caption: 'Um dos vários momentos nossos a estudar intensamente na biblioteca' },
    { src: 'assets/pictures/hand2.jpg', caption: 'Quando eu voltei para casa e tu me fizeste este smile e eu tirei foto. Foi naquele dia que disseste para eu não lavar e eu deixei até o dia seguinte' },
    { src: 'assets/pictures/nos1.jpg', caption: 'Esta foto está melhor que aquelas que aparecem no pinterest de couple picture ideas' },
    { src: 'assets/pictures/barrits.jpg', caption: 'Uma das minhas fotos favoritas tuas, apesar de ter sido difícil escolher. És a strawberry blonde mais bonita, elegante, aesthetic, engraçada, inteligente e amiga deste mundo, a minha strawberry blonde. Love you :)' }
  ];
  private currentPhotoIndex = 0;
  private fireflies!: THREE.Points;
  private firefliesVelocities: THREE.Vector3[] = [];

  

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // 1. Core Setup
      this.initScene();
      this.setupLighting();
      
      // 2. World Creation
      this.createPlanet();
      this.createAtmosphere();
      this.beautifyPlanet();
      this.createConstellation(this.constellationString, 60);
      
      // 3. Object Loading
      this.loadPlayerModel();
      this.createChest();
      this.loadTree();
      this.loadDecorations(); // All small items (cats, guitars, tables)
      this.loadLampPosts();   // Specialized lamp loading
      
      // 4. UI & Controls
      this.createAudioUI();
      this.setupInputs();
      
      // 5. Audio Init
      this.initChestAudio();
      this.setupBackgroundAudio();

      // 6. Start Loop
      this.animate();
      window.addEventListener('resize', this.onWindowResizeBound);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResizeBound);
    this.cleanupInputs();
    
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    
    this.controls?.dispose();
    this.renderer?.dispose();
    this.stopChestAudio();
    if(this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    
    this.closePhotoAlbumModal();
    const modal = document.getElementById('music-controller');
    if (modal) modal.remove();
  }

  /** ==========================================================================================
   * SECTION 1: INITIALIZATION & CORE
   * ========================================================================================== */
  
  private initScene() {
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

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(this.labelRenderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
  }

  private setupLighting() {
    // Main Sun/Moon
    const mainLight = new THREE.DirectionalLight(0xfff4e6, 1.8);
    mainLight.position.set(30, 50, 30);
    mainLight.castShadow = true;
    // Optimized shadow camera
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 60;
    mainLight.shadow.mapSize.width = 2048; // Higher res shadows
    mainLight.shadow.mapSize.height = 2048;
    this.scene.add(mainLight);

    // Fill Lights
    const fillLight = new THREE.DirectionalLight(0x4466ff, 0.4);
    fillLight.position.set(-20, 30, -20);
    this.scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x3b8a3b, 0.9);
    this.scene.add(hemiLight);

    const warmAmbient = new THREE.AmbientLight(0xfff4e6, 0.35);
    this.scene.add(warmAmbient);

    this.addDecorativeLights();
  }

  private createGradientBackground(): THREE.Color {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#0a0a2a');
    gradient.addColorStop(0.5, '#1a1a4a');
    gradient.addColorStop(1, '#7b6baeff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);
    return new THREE.Color(0x101520); // Fallback
  }

  /** ==========================================================================================
   * SECTION 2: WORLD GENERATION (Planet, Atmosphere, Environment)
   * ========================================================================================== */

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
  }

  private beautifyPlanet() {
    this.addStars(100);
    this.addSurfacePebbles(120);
    this.addSurfaceBushes(12);

    const craterDirection = new THREE.Vector3( 0.6,   // between table & temple
 -0.54,  // pulled downward toward tree
  0.6 ).normalize();

this.carveCraterOnPlanet(
  craterDirection,
  2.4, // radius
  0.7  // depth
);

this.addCraterRim(craterDirection, 2.4);
this.loadDeadModelInCrater(craterDirection, 0.7);


  }

  // --- Specialized Loading Helpers ---

  private loadLampPosts() {
    // 1. Lamp Post near player
    this.createLampPost(new THREE.Vector3(1, 1, -1), -1.5);
    
    // 2. Lamp Post far side
    this.createLampPost(new THREE.Vector3(-1, -2, -4), -1.5);
    
    // 3. Lamp Post (Original position)
    this.createLampPost(new THREE.Vector3(-1, -0.3, 0.2), -1.5);
  }

  /**
   * Helper to load a lamp post and attach working lights
   */
  private createLampPost(direction: THREE.Vector3, rotationX: number) {
    const loader = new GLTFLoader();
    loader.load('assets/models/lamp_post.glb', (gltf) => {
      const lamp = gltf.scene;
      lamp.scale.set(0.05, 0.05, 0.05);

      const lampPos = direction.normalize().multiplyScalar(this.planetRadius - 0.15);
      lamp.position.copy(lampPos);
      lamp.lookAt(new THREE.Vector3(0, 0, 0));
      lamp.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotationX);
      lamp.castShadow = true;
      this.scene.add(lamp);

      // --- LIGHT FIX ---
      // We attach the light relative to the Lamp Post's structure
      // 1. SpotLight for the ground beam
      const spotLight = new THREE.SpotLight(0xffaa33, 50); // High intensity
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.5;
      spotLight.distance = 15;
      spotLight.castShadow = true;
      spotLight.shadow.bias = -0.0001;
      
      // Calculate light bulb position relative to the post
      // Assuming the model is approx 5 units high at scale 0.05
      const bulbOffset = new THREE.Vector3(0, 4.5, 1.5); // Adjust Y/Z based on model shape
      // We need to transform this local offset to world space
      const worldBulbPos = bulbOffset.clone().applyMatrix4(lamp.matrixWorld);
      
      spotLight.position.copy(worldBulbPos);
      
      // Target the ground directly below the bulb
      const targetObj = new THREE.Object3D();
      const targetPos = worldBulbPos.clone().sub(lamp.position).normalize().negate(); // Vector towards center roughly
      targetObj.position.copy(new THREE.Vector3(0,0,0)); // Look at world center is easiest for planet
      this.scene.add(targetObj);
      spotLight.target = targetObj;
      
      this.scene.add(spotLight);

      // 2. PointLight for ambient glow around the bulb
      const pointLight = new THREE.PointLight(0xffaa33, 5, 5);
      pointLight.position.copy(worldBulbPos);
      this.scene.add(pointLight);

      // 3. Visible "Bulb" so we know where the light is
      const bulbGeo = new THREE.SphereGeometry(0.15, 8, 8);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffffaa });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.copy(worldBulbPos);
      this.scene.add(bulb);
    });
  }

  private loadDecorations() {
    const loader = new GLTFLoader();

    // Cat
    loader.load('assets/models/Cat.glb', (gltf) => {
      const cat = gltf.scene;
      cat.scale.set(0.2, 0.2, 0.2);
      const catDir = new THREE.Vector3(1, 1, 1).normalize();
      this.placeObjectOnPlanet(cat, catDir, -0.15);
      cat.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      cat.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI-1);
      this.scene.add(cat);
      this.addFloatingText(cat, "miau barrita :)");
    });

    // Bed
    loader.load('assets/models/Bed2.glb', (gltf) => {
      const bed = gltf.scene;
      bed.scale.set(2, 2, 2);
      const dir = new THREE.Vector3(-1, -1, -1).normalize();
      this.placeObjectOnPlanet(bed, dir, -0.15);
      bed.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      bed.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI-5);
      this.scene.add(bed);
    });

    // Bag
    loader.load('assets/models/prada_bag.glb', (gltf) => {
      const bag = gltf.scene;
      bag.scale.set(10, 10, 10);
      const dir = new THREE.Vector3(0, -0.3, -3).normalize();
      this.placeObjectOnPlanet(bag, dir, 0.25);
      bag.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      bag.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/3);
      bag.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/10);
      this.scene.add(bag);
    });

    // Temple
    loader.load('assets/models/Temple.glb', (gltf) => {
      const temple = gltf.scene;
      temple.scale.set(3, 3, 3);
      const dir = new THREE.Vector3(0, 0.3, 3).normalize();
      this.placeObjectOnPlanet(temple, dir, -1);
      temple.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      temple.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/3);
      this.scene.add(temple);
    });

    // Ibanez
    loader.load('assets/models/Ibanez1.glb', (gltf) => {
      const guitar = gltf.scene;
      guitar.scale.set(2, 2, 2);
      const dir = new THREE.Vector3(-1, -0.2, 0.13).normalize();
      this.placeObjectOnPlanet(guitar, dir, 0.15);
      guitar.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2+0.05);
      guitar.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI/3);
      this.scene.add(guitar);
      this.addFloatingText(guitar, "Press ' O '");
    });

    // Strat
    loader.load('assets/models/Strat.glb', (gltf) => {
      const guitar = gltf.scene;
      guitar.scale.set(2, 2, 2);
      const dir = new THREE.Vector3(-1, -0.2, -0.13).normalize();
      this.placeObjectOnPlanet(guitar, dir, -0.21);
      guitar.rotateOnAxis(new THREE.Vector3(1, 0, 0), -3);
      guitar.rotateOnAxis(new THREE.Vector3(0, 1, 0), 1.66);
      this.scene.add(guitar);
    });

    // Table
    loader.load('assets/models/antique_table.glb', (gltf) => {
      const table = gltf.scene;
      table.scale.set(0.07, 0.07, 0.07);
      const dir = new THREE.Vector3(4, 0, 0).normalize();
      this.placeObjectOnPlanet(table, dir, -0.21);
      table.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI/2);
      this.scene.add(table);
      this.addFloatingText(table, "Sushi e Francesinha");
    });

    // Food
    loader.load('assets/models/francesinha.glb', (gltf) => {
      const obj = gltf.scene;
      obj.scale.set(2, 2, 2);
      const dir = new THREE.Vector3(16, -3, 0).normalize();
      // Manual adjustment for specific offset request in original code
      obj.position.copy(dir.multiplyScalar(this.planetRadius + 14.6)); 
      obj.lookAt(new THREE.Vector3(0,0,0));
      obj.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      obj.castShadow = true;
      this.scene.add(obj);
    });

    loader.load('assets/models/sushi.glb', (gltf) => {
      const obj = gltf.scene;
      obj.scale.set(2, 2, 2);
      const dir = new THREE.Vector3(16, 1, 0).normalize();
      obj.position.copy(dir.multiplyScalar(this.planetRadius + 1.35));
      obj.lookAt(new THREE.Vector3(0,0,0));
      obj.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      obj.castShadow = true;
      this.scene.add(obj);
    });

    // Dog
    loader.load('assets/models/dog.glb', (gltf) => {
      const dog = gltf.scene;
      dog.scale.set(0.5, 0.5, 0.5);
      const dir = new THREE.Vector3(1, 0, -1.1).normalize();
      this.placeObjectOnPlanet(dog, dir, 0.7);
      dog.rotateOnAxis(new THREE.Vector3(1, 0, 0), -1.5);
      this.scene.add(dog);
      this.addFloatingText(dog, "AUAU AUAU MEGGUI AUAU");

      if (gltf.animations?.length) {
        this.secondaryMixer = new THREE.AnimationMixer(dog);
        this.secondaryMixer.clipAction(gltf.animations[0]).play();
      }
    });

    // Test Item (Box + Billboard)
    const boxGeo = new THREE.BoxGeometry(3, 0.2, 3);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x292b21 });
    const testItem = new THREE.Mesh(boxGeo, boxMat);
    testItem.castShadow = true;
    testItem.position.set(10, this.planetRadius + 0.5, 0);
    this.scene.add(testItem);
    this.collidableObjects.push(testItem);

    loader.load('assets/models/Billboard.glb', (gltf) => {
      const billboard = gltf.scene;
      billboard.scale.set(0.9, 0.9, 0.9);
      billboard.position.copy(testItem.position);
      billboard.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI/2);
      billboard.position.y += 0.5;
      this.scene.add(billboard);
    });
  }

  private loadDeadModelInCrater(
  craterDirection: THREE.Vector3,
  depth = 0.6
) {
  const loader = new GLTFLoader();

  loader.load('assets/models/dead.glb', (gltf) => {
    const dead = gltf.scene;

    // ---- SCALE (adjust if needed) ----
    dead.scale.set(0.8, 0.8, 0.8);

    // ---- POSITION: INSIDE CRATER ----
    const dir = craterDirection.clone().normalize();

    dead.position.copy(
      dir.multiplyScalar(this.planetRadius - depth)
    );

    // ---- ALIGN TO PLANET SURFACE ----
    dead.lookAt(new THREE.Vector3(0, 0, 0));
    dead.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

    dead.traverse(obj => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    this.scene.add(dead);
    this.addFloatingText(dead, "This is how i fell for you :O");
  },
  undefined,
  (err) => console.error('Failed to load dead.glb:', err)
  );
}

  // Helper to place objects on planet surface
  private placeObjectOnPlanet(obj: THREE.Object3D, direction: THREE.Vector3, heightOffset: number) {
    obj.position.copy(direction.multiplyScalar(this.planetRadius + heightOffset));
    obj.lookAt(new THREE.Vector3(0, 0, 0));
    obj.castShadow = true;
  }

  /** ==========================================================================================
   * SECTION 3: AUDIO SYSTEM
   * ========================================================================================== */
  
  private setupBackgroundAudio() {
    // FIX: Using corrected playlist paths
    this.backgroundMusic = new Audio(this.playlist[this.currentSongIndex]);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;
    
    // Add event listener to log errors if files are missing
    this.backgroundMusic.addEventListener('error', (e) => {
        console.error(`Error loading audio file: ${this.backgroundMusic.src}`, e);
    });
  }

  private initChestAudio() {
    // FIX: Path update
    this.chestAudio = new Audio('assets/audios/no_surprises.mp3');
    this.chestAudio.preload = 'auto';
    this.chestAudio.volume = 0.5;
    this.chestAudio.loop = false;
  }

  private createAudioUI() {
    const container = document.createElement('div');
    container.id = 'music-controller';
    container.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.7);
        padding: 15px; border-radius: 12px; color: white; font-family: Arial, sans-serif;
        display: flex; flex-direction: column; gap: 10px; z-index: 1000;
        backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.2);
        min-width: 150px;
    `;

    const title = document.createElement('div');
    title.id = 'song-title';
    title.textContent = '🎵 Music: Paused';
    title.style.fontSize = '12px';
    container.appendChild(title);

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '10px';
    controls.style.alignItems = 'center';

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '⏭ Skip';
    nextBtn.style.cssText = 'background: #444; border: none; color: white; padding: 5px 10px; cursor: pointer; border-radius: 4px;';
    nextBtn.onclick = () => this.skipSong();
    
    controls.appendChild(nextBtn);
    container.appendChild(controls);

    const volumeLabel = document.createElement('div');
    volumeLabel.textContent = 'Volume';
    volumeLabel.style.fontSize = '10px';
    container.appendChild(volumeLabel);

    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.01';
    volumeSlider.value = '0.3';
    volumeSlider.style.width = '100%';
    volumeSlider.oninput = (e: any) => {
        const vol = parseFloat(e.target.value);
        if (this.backgroundMusic) this.backgroundMusic.volume = vol;
    };
    container.appendChild(volumeSlider);

    document.body.appendChild(container);
  }

  private skipSong() {
    if (!this.backgroundMusic) return;

    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    
    this.backgroundMusic.pause();
    this.backgroundMusic.src = this.playlist[this.currentSongIndex];
    this.backgroundMusic.load();
    
    // Attempt play
    const playPromise = this.backgroundMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.updateMusicUI();
      }).catch(e => {
        console.warn("Auto-play blocked on skip:", e);
      });
    }
  }

  private updateMusicUI() {
    const title = document.getElementById('song-title');
    if (title) {
        // Show file name without path
        const songName = this.playlist[this.currentSongIndex].split('/').pop();
        title.textContent = `🎵 Playing: ${songName}`;
    }
  }

  /** ==========================================================================================
   * SECTION 4: PLAYER LOGIC & INPUTS
   * ========================================================================================== */

  private loadPlayerModel() {
    const loader = new GLTFLoader();
    loader.load('assets/models/Animated_Woman.glb', (gltf) => {
      this.playerModel = gltf.scene;
      this.playerModel.position.set(0, this.planetRadius, 0);
      this.playerModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) child.castShadow = true;
      });
      this.scene.add(this.playerModel);
      
      this.mixer = new THREE.AnimationMixer(this.playerModel);
      gltf.animations.forEach((clip) => {
        this.animations[clip.name] = this.mixer.clipAction(clip);
      });
      
      // Default animation
      const animNames = Object.keys(this.animations);
      if (animNames.length > 4) this.playAnimation(animNames[4]);
      else if (animNames.length > 0) this.playAnimation(animNames[0]);

    }, undefined, (err) => console.error('Failed to load Player GLB:', err));
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

    if (this.keys.left) { this.playerModel.rotateY(this.turnSpeed); isMoving = true; }
    if (this.keys.right) { this.playerModel.rotateY(-this.turnSpeed); isMoving = true; }
    if (this.keys.forward) { this.playerModel.translateZ(this.playerSpeed); isMoving = true; }
    if (this.keys.backward) { this.playerModel.translateZ(-this.playerSpeed); isMoving = true; }

    if (isMoving) {
        // Spherical Gravity Logic
        const currentPos = this.playerModel.position.clone();
        currentPos.normalize().multiplyScalar(this.planetRadius); 
        this.playerModel.position.copy(currentPos);
        
        const up = this.playerModel.position.clone().normalize();
        const playerUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.playerModel.quaternion);
        const alignQuat = new THREE.Quaternion().setFromUnitVectors(playerUp, up);
        this.playerModel.quaternion.premultiply(alignQuat);
    }

    // Animation Switching
    if (this.keys.forward) this.playAnimation(animNames[16] || 'Run');
    else if (this.keys.backward) this.playAnimation(animNames[17] || 'Run_Back');
    else if (animNames.length > 4) this.playAnimation(animNames[4]);
  }

  // --- Input Handlers ---
  
  private setupInputs() {
    window.addEventListener('keydown', this.onKeyDownBound);
    window.addEventListener('keyup', this.onKeyUpBound);
    window.addEventListener('mousedown', this.handleFirstInteractionBound, { once: true });
    // Also listen for keydown once for audio start
    window.addEventListener('keydown', this.handleFirstInteractionBound, { once: true });
  }

  private cleanupInputs() {
    window.removeEventListener('keydown', this.onKeyDownBound);
    window.removeEventListener('keyup', this.onKeyUpBound);
    window.removeEventListener('mousedown', this.handleFirstInteractionBound);
    window.removeEventListener('keydown', this.handleFirstInteractionBound);
  }

  private onKeyDownBound = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'w') this.keys.forward = true;
    if (e.key === 'ArrowDown' || e.key === 's') this.keys.backward = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = true;
    
    if (e.key === 'o' || e.key === 'O') {
        if (this.isNearChest) this.showCongratsModal();
        if (this.isNearTree) this.showPhotoAlbumModal();
    }
  };

  private onKeyUpBound = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'w') this.keys.forward = false;
    if (e.key === 'ArrowDown' || e.key === 's') this.keys.backward = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
  };

  private handleFirstInteractionBound = () => {
    if (!this.attemptedMusicStart && this.backgroundMusic) {
      this.backgroundMusic.play().then(() => {
        this.updateMusicUI();
      }).catch(err => console.error("Auto-play blocked:", err));
      this.attemptedMusicStart = true;
    }
  };

  /** ==========================================================================================
   * SECTION 5: GAME LOOP & UTILS
   * ========================================================================================== */

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    
    if (this.mixer) this.mixer.update(delta);
    if (this.secondaryMixer) this.secondaryMixer.update(delta);

    this.updatePlayerMovement();
    this.updateFireflies();
    this.checkProximities();
    this.updateLabels();
    
    if (this.playerModel && this.controls) {
      this.controls.target.copy(this.playerModel.position);
    }
    this.controls.update();
    
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  };

  private checkProximities() {
    if (!this.playerModel) return;
    
    if (this.chest) {
      const dist = this.playerModel.position.distanceTo(this.chest.position);
      this.isNearChest = dist < 2.5;
    }
    
    if (this.tree) {
      const dist = this.playerModel.position.distanceTo(this.tree.position);
      this.isNearTree = dist < 3.0;
    }
  }

  private updateLabels() {
    if (!this.playerModel) return;
    const activationDistance = 5;
    this.proximityLabels.forEach(item => {
        const distance = this.playerModel.position.distanceTo(item.model.position);
        item.element.style.opacity = distance < activationDistance ? '1' : '0';
    });
  }

  private onWindowResizeBound = () => {
    if (!this.container) return;
    const w = this.container.nativeElement.clientWidth;
    const h = this.container.nativeElement.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  /** ==========================================================================================
   * SECTION 6: PROCEDURAL GENERATION & DECOR (Keeping existing logic mostly as is)
   * ========================================================================================== */

  private createGroundTexture(): THREE.Texture {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#3b8a3b';
    ctx.fillRect(0, 0, size, size);
    
    // Existing blotches
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * size, y = Math.random() * size, r = 6 + Math.random() * 40;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, `rgba(${Math.floor(80+Math.random()*60)},${120+Math.random()*60},80,0.1)`);
      grd.addColorStop(1, `rgba(59,138,59,0)`);
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    
    // Speckles
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    for (let i = 0; i < 4000; i++) ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  private addSurfacePebbles(count: number) {
    const group = new THREE.Group();
    const geo = new THREE.SphereGeometry(0.06, 6, 6);
    const mat = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.95 });
    for (let i = 0; i < count; i++) {
        const dir = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(dir.multiplyScalar(this.planetRadius + 0.05));
        mesh.lookAt(new THREE.Vector3(0,0,0));
        group.add(mesh);
    }
    this.scene.add(group);
  }

  private addSurfaceBushes(count: number) {
    // Keeping your original bush logic
    const group = new THREE.Group();
    const greens = [0x2e7d32, 0x2b8a3a, 0x3b8a3b];
    for (let i = 0; i < count; i++) {
        const dir = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
        const bush = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 6), new THREE.MeshStandardMaterial({color: 0x6b4b2a}));
        base.position.y = 0.04; bush.add(base);
        for(let l=0; l<3; l++) {
            const m = new THREE.Mesh(new THREE.SphereGeometry(0.7-l*0.18, 8, 6), new THREE.MeshStandardMaterial({color: greens[Math.floor(Math.random()*3)]}));
            m.position.y = 0.15 + l*0.18; bush.add(m);
        }
        bush.position.copy(dir.multiplyScalar(this.planetRadius + 0.02));
        bush.lookAt(new THREE.Vector3(0,0,0));
        group.add(bush);
    }
    this.scene.add(group);
  }

  private addStars(count: number) {
    const pos = [], cols = [];
    const col = new THREE.Color();
    for(let i=0; i<count; i++) {
        const v = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize().multiplyScalar(40 + Math.random()*100);
        pos.push(v.x, v.y, v.z);
        if(Math.random()>0.5) col.setHex(0xffffff); else col.setHex(0xfff4e6);
        cols.push(col.r, col.g, col.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    const mat = new THREE.PointsMaterial({size: 0.8, vertexColors: true, transparent: true, opacity: 0.9});
    this.scene.add(new THREE.Points(geo, mat));
  }

  private addDecorativeLights() {
     const positions = [
       { p: new THREE.Vector3(15, 5, 15), c: 0xffaa88 },
       { p: new THREE.Vector3(-15, 8, 10), c: 0x88aaff }
     ];
     positions.forEach(d => {
       const l = new THREE.PointLight(d.c, 0.8, 50);
       l.position.copy(d.p);
       this.scene.add(l);
     });
  }

  private createConstellation(text: string, dist: number) {
    // Simplified logic for brevity, keeps your existing implementation
    const cvs = document.createElement('canvas'); cvs.width=512; cvs.height=256;
    const ctx = cvs.getContext('2d')!;
    ctx.fillStyle='black'; ctx.fillRect(0,0,512,256);
    ctx.fillStyle='white'; ctx.font='bold 100px Arial'; ctx.textAlign='center'; ctx.fillText(text, 256, 128);
    
    const pts = [];
    const data = ctx.getImageData(0,0,512,256).data;
    for(let y=0; y<256; y+=6) {
        for(let x=0; x<512; x+=6) {
            if(data[(y*512+x)*4]>100) {
                const u = (x/512)-0.5, v = (y/256)-0.5;
                const v3 = new THREE.Vector3(0,0,-dist);
                v3.applyAxisAngle(new THREE.Vector3(1,0,0), v*Math.PI*0.3 - Math.PI/6);
                v3.applyAxisAngle(new THREE.Vector3(0,1,0), u*Math.PI*0.8);
                v3.x += Math.random()-0.5;
                pts.push(v3);
            }
        }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const stars = new THREE.Points(geo, new THREE.PointsMaterial({color: 0x88ccff, size:0.8}));
    stars.rotation.y = Math.PI/2; stars.rotation.z = Math.PI;
    this.scene.add(stars);
  }

  // --- Modals & Other Utils ---

  private addFloatingText(model: THREE.Object3D, text: string) {
    const div = document.createElement('div');
    div.className = 'floating-label';
    div.textContent = text;
    div.style.cssText = 'color: white; font-family: Arial; padding: 5px; background: rgba(0,0,0,0.6); border-radius: 5px; opacity: 0; transition: opacity 0.5s; font-size: 14px;';
    const label = new CSS2DObject(div);
    label.position.set(0, 2, 0);
    model.add(label);
    this.proximityLabels.push({ model, element: div });
  }

  private createChest() {
    // Keep your exact chest creation code
    const chest = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.2,0.35), new THREE.MeshStandardMaterial({color:0x8b4513}));
    body.position.y=0.2; chest.add(body);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.52,0.1,0.37), new THREE.MeshStandardMaterial({color:0xa0522d}));
    lid.position.y=0.35; chest.add(lid);
    
    const dir = new THREE.Vector3(-1,-0.2,0).normalize();
    chest.position.copy(dir.multiplyScalar(this.planetRadius-0.15));
    chest.lookAt(new THREE.Vector3(0,0,0));
    chest.rotateOnAxis(new THREE.Vector3(1,0,0), -Math.PI/2);
    this.chest = chest;
    this.scene.add(chest);
  }

  private loadTree() {
     const loader = new GLTFLoader();
     loader.load('assets/models/Tree.glb', (gltf) => {
       this.tree = gltf.scene;
       this.tree.scale.set(0.6,0.6,0.6);
       const dir = new THREE.Vector3(0,-8,0).normalize();
       this.placeObjectOnPlanet(this.tree, dir, -0.15);
       this.tree.rotateOnAxis(new THREE.Vector3(1,0,0), -Math.PI/2);
       this.tree.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI-5);
       this.scene.add(this.tree);
       this.tree.add(this.createFireflies(80));
       this.addFloatingText(this.tree, "Press ' O '");
     });
  }

  private createFireflies(count: number): THREE.Points {
    const pos = new Float32Array(count*3);
    this.firefliesVelocities = [];
    for(let i=0; i<count*3; i+=3) {
        const r = 3.5+Math.random()*0.5, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
        pos[i] = r*Math.sin(ph)*Math.cos(th);
        pos[i+1] = r*Math.sin(ph)*Math.sin(th);
        pos[i+2] = r*Math.cos(ph);
        this.firefliesVelocities.push(new THREE.Vector3((Math.random()-0.5)*0.005, (Math.random()-0.5)*0.005, (Math.random()-0.5)*0.005));
    }
    this.fireflies = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)), 
    new THREE.PointsMaterial({color: 0xffff99, size: 0.15, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending}));
    return this.fireflies;
  }

  private updateFireflies() {
    if(!this.fireflies) return;
    const pos = this.fireflies.geometry.getAttribute('position');
    const arr = pos.array as Float32Array;
    const t = Date.now()*0.001;
    for(let i=0; i<arr.length; i+=3) {
        const v = this.firefliesVelocities[i/3];
        arr[i] += Math.sin(t+i)*0.002 + v.x;
        arr[i+1] += Math.cos(t*0.7+i)*0.002 + v.y;
        arr[i+2] += Math.sin(t*0.5+i*0.7)*0.002 + v.z;
    }
    pos.needsUpdate = true;
  }

private carveCraterOnPlanet(
  direction: THREE.Vector3, // WHERE the crater is
  craterRadius = 2.4,
  craterDepth = 1
) {
  const geometry = this.planet.geometry as THREE.SphereGeometry;
  const pos = geometry.attributes['position'] as THREE.BufferAttribute;

  const craterDir = direction.clone().normalize();

  for (let i = 0; i < pos.count; i++) {
    const vertex = new THREE.Vector3(
      pos.getX(i),
      pos.getY(i),
      pos.getZ(i)
    );

    const distanceFromCenter = vertex.length();
    const normal = vertex.clone().normalize();

    // How aligned this vertex is with crater direction
    const alignment = normal.dot(craterDir);

    if (alignment <= 0) continue;

    // Convert alignment to surface distance
    const surfaceDistance = Math.sqrt(1 - alignment * alignment) * this.planetRadius;

    if (surfaceDistance > craterRadius) continue;

    // Smooth falloff
    const t = surfaceDistance / craterRadius;

    // Slight irregularity
    const noise = (Math.random() - 0.5) * 0.05;

    // Shape curve (flat bottom)
    let depthFactor;
    if (t < 0.3) {
      depthFactor = 1; // flat bottom
    } else {
      depthFactor = 1 - (t - 0.3) / 0.7;
    }

    const displacement = craterDepth * depthFactor + noise;

    vertex.addScaledVector(normal, -displacement);

    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

private addCraterRim(direction: THREE.Vector3, radius = 2.4) {
  const rimGeo = new THREE.RingGeometry(radius * 0.85, radius, 32);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x5b5b5b,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = -Math.PI / 2;

  // Irregular rim
  const pos = rimGeo.attributes['position'] as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const n = (Math.random() - 0.5) * 0.15;
    pos.setZ(i, n);
  }
  pos.needsUpdate = true;

  const dir = direction.clone().normalize();
  rim.position.copy(dir.multiplyScalar(this.planetRadius - 0.4));
  rim.lookAt(new THREE.Vector3(0, 0, 0));
 // rim.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  rim.castShadow = true;
  rim.receiveShadow = true;

  this.scene.add(rim);
}


  // --- Modals ---
  
  private showCongratsModal() {
    if (this.backgroundMusic) this.backgroundMusic.pause();
    
    // Simple DOM creation for modal
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 2000;';
    
    const content = document.createElement('div');
    content.style.cssText = 'background: white; padding: 40px; border-radius: 10px; text-align: center; font-family: sans-serif;';
    content.innerHTML = `<h1>🎉 PARABÉNSSSS! 🎉</h1><p>Uma lembrança para os teus 21 anos!</p>`;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = 'margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;';
    closeBtn.onclick = () => {
        this.stopChestAudio();
        modal.remove();
        if (this.backgroundMusic) this.backgroundMusic.play();
    };

    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    this.playChestAudio();
  }

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
      const m = document.getElementById('photo-album-modal');
      if(m) m.remove();
  }

  private playChestAudio() {
    if (this.chestAudio) {
        this.chestAudio.currentTime = 0;
        this.chestAudio.play().catch(e => console.warn(e));
    }
  }
  
  private stopChestAudio() {
    if (this.chestAudio) {
        this.chestAudio.pause();
        this.chestAudio.currentTime = 0;
    }
  }
}