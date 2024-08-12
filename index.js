import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/FBXLoader.js';
import { createRenderer } from './renderer.js';
import { createCamera } from './camera.js';
import { viewSize } from './camera.js';
import { loadBackgroundModel } from './background.js';
import { createLight } from './light.js';
import Character from './character.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/OrbitControls.js';

// Create the renderer
const renderer = createRenderer();

// Add renderer to document
document.body.appendChild(renderer.domElement);

// Create camera
const camera = createCamera();

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Create light
const light = createLight(scene);

// Load background fbx model
loadBackgroundModel(scene);

const character = new Character(scene, 'Aj', 0, 0);

// Uncoment for orbit
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (character.getMixer()) character.getMixer().update(delta);

    //Uncoment for orbit
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -viewSize * aspect / 2;
    camera.right = viewSize * aspect / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();
});
