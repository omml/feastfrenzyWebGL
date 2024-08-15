//
//  index.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 10/Aug/2024.
//
import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/FBXLoader.js';
import { createRenderer } from './renderer.js';
import { createCamera } from './camera.js';
import { viewSize } from './camera.js';
import { loadBackgroundModel } from './background.js';
import { placeExtraObjects } from './extraobjs.js';
import { createLight } from './light.js';
import CharacterPlayer from './characterPlayer.js';
import Food from './food.js';
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

placeExtraObjects(scene);

const player = new CharacterPlayer(scene, 'Aj', 0, 0);

const food = new Food(scene,'birthdaycake', 0, 0, -5);

setTimeout(testCarrying, 5000);

function testCarrying() {
    food.setCarriedPosition();
}

setTimeout(testReleasing, 10000);

function testReleasing() {
    food.setFreePosition(scene);
}


// Uncoment for orbit
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    
    //Update character animation
    player.update(delta);

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
