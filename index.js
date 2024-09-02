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
//import CharacterEnemy from './characterEnemy.js';
import EnemyHandler from './enemyHandler.js';
import FoodHandler from './foodHandler.js';
import { Direction } from './commonDefinitions.js';

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

/*
const player = new CharacterPlayer(scene, 'Aj', 0, 0);

const food = new Food(scene, 'birthdaycake', 0, 0, -5);

setTimeout(testCarrying, 5000);

function testCarrying()
{
	food.setCarriedPosition(player);
}

setTimeout(testReleasing, 10000);

function testReleasing()
{
	food.setFreePosition(scene);
}
*/

/*
const enemy = new CharacterEnemy(scene, "Claire", -34, 0, Direction.LEFT);
enemy.setCurrentDirection(Direction.RIGHT);
enemy.setLimits(-26.5, 14);
const enemy = new CharacterEnemy(scene, "Claire", 34, 0, Direction.RIGHT);
enemy.setCurrentDirection(Direction.LEFT);
enemy.setLimits(28.5, 14);

const enemyFood = new Food(scene, 'birthdaycake', 0, 0, -5);
setTimeout(testCarrying, 5000);

function testCarrying()
{
	enemy.setFood(enemyFood);
	enemyFood.setCarriedPosition(enemy);
}
setTimeout(testEnemy,10000);
function testEnemy()
{
	//enemy.startMoving(Direction.LEFT)
	enemy.startMoving(Direction.RIGHT);
}
*/

const enemyHandler = new EnemyHandler(scene, Direction.LEFT);
const foodHandler = new FoodHandler(scene);

setTimeout(testEnemyHandler,10000);

function testEnemyHandler()
{
	foodHandler.start(scene);
	enemyHandler.setFoodHandler(foodHandler);
	enemyHandler.start();
}


// Uncoment for orbit
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
const clock = new THREE.Clock();

function animate()
{
	requestAnimationFrame(animate);

	const delta = clock.getDelta();

	
	//Update character animation
	//player.update(delta);

	//food.update(delta);
	

	//enemy.update(delta);
	//enemyFood.update(delta);

	enemyHandler.update(delta);
	foodHandler.update(delta);

	//Uncoment for orbit
	controls.update();
	renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function ()
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	const aspect = window.innerWidth / window.innerHeight;
	camera.left = -viewSize * aspect / 2;
	camera.right = viewSize * aspect / 2;
	camera.top = viewSize / 2;
	camera.bottom = -viewSize / 2;
	camera.updateProjectionMatrix();
});
