import { Component, signal } from '@angular/core';
import { ThreeSceneComponent } from './three-scene/three-scene';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ThreeSceneComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('three-demo');
}
