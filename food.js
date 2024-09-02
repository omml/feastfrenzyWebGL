//
//  food.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 13/Aug/2024.
//
import * as THREE from 'three';

import FoodStatic from './foodStatic.js';
import CharacterPlayer from './characterPlayer.js';
import { FoodState } from './commonDefinitions.js';

class Food extends FoodStatic
{

	#fromPlayer;
	#state;
	#direction;
	#speed;
	#enemy;
	#isCake;

	constructor(scene, fileName, x, y, z, isCake, display = true)
	{
		super(scene, fileName, x, y, z, 0, display);

		this.#state = FoodState.FOOD_IDLE;
		this.#direction = new THREE.Vector2(0, -1);
		this.#speed = 10;
		this.#isCake = isCake;
		this.oppositeCollisionObj = [];

	}

	// Set enemies that are opposite, so collision is tested against them
	setOppositeCollisionObj(id)
	{
		this.oppositeCollisionObj.push(id);
	}

	// Returns food's state
	getFoodState()
	{
		return this.#state;
	}

	// Returns wheather food is cake
	getIsCake()
	{
		return this.#isCake;
	}

	// Sets the enemy related to this food
	setEnemy(enemy)
	{
		this.#enemy = enemy;
		this.setCarriedPosition(enemy);
	}

	// Sets the food to the carrying state
	setCarriedPosition(carryingCharacter)
	{
		var worldPosition = new THREE.Vector3();
		var worldRotation = new THREE.Quaternion();
		var worldScale = new THREE.Vector3();

		worldPosition = carryingCharacter.getWorldPosition();
		this._model.getWorldQuaternion(worldRotation);
		this._model.getWorldScale(worldScale);

		carryingCharacter.addChildObject(this._model);

		var worldMatrix = new THREE.Matrix4();
		worldMatrix.compose(worldPosition, worldRotation, worldScale);

		// Convert the world transform into local space of the new parent
		var localMatrix = new THREE.Matrix4();
		localMatrix.copy(carryingCharacter.getMatrixWorld()).invert(); // Invert parent's world matrix
		localMatrix.multiply(worldMatrix); // Multiply by world matrix of object B

		// Decompose the result into position, rotation, and scale
		localMatrix.decompose(this._model.position, this._model.quaternion, this._model.scale);

		this._model.position.z += 25;
		this._model.position.y += 180;
	}

	// Thorws the food
	throwFood( carryingCharacter, fromPlayer) // moveSpeed,
	{
		this.#fromPlayer = fromPlayer;

		this.setFreePosition(carryingCharacter);
	}

	// Detaches the food from the character
	setFreePosition(carryingCharacter)
	{
		// Get the current world position, rotation, and scale of the model
		var worldPosition = new THREE.Vector3();
		var worldRotation = new THREE.Quaternion();
		var worldScale = new THREE.Vector3();

		this._model.getWorldPosition(worldPosition);
		this._model.getWorldQuaternion(worldRotation);
		this._model.getWorldScale(worldScale);

		var rotation = new THREE.Euler().setFromQuaternion(worldRotation);

		carryingCharacter.removeChildObject(this._model);

		this._model.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
		this._model.rotation.set(rotation.x, rotation.y, rotation.z);
		this._model.scale.setScalar(worldScale.x);

		const dir = carryingCharacter.getDirectionBeforeStopping();
		this.#direction.x = dir.x;
		this.#direction.y = dir.y;

		this.#state = FoodState.FOOD_FLYING;

		this._scene.add(this._model);
	}

	// Moves the food when is not attached to a character
	#moveFood(deltaTime)
	{
		if (this._model)
		{
			this._model.position.x += this.#direction.x * this.#speed * deltaTime;
			this._model.position.y += this.#direction.y * this.#speed * deltaTime;
		}
	}

	// Food got out of screen or splashed
	setIdle()
	{
		this.#state = FoodState.FOOD_IDLE;
	}

	// Check if food is inside screen
	isOutsideScreen()
	{
		let retVal = false;

		if (this._model.position.x > 34 || this._model.position.x < -34 || this._model.position.y > 16 || this._model.position.y < -5)
		{
			this.setPosition(10000,10000,10000);
			retVal = true;
		}
		
		return retVal;
	}

	// Restart food
	reStart()
	{
		// Resets flag to indicate who throw the food for collision detection
		this.#fromPlayer = false;

		this.setCarriedPosition(this.#enemy);

		// Sets initial food state
		this.#state = FoodState.FOOD_CARRIED_ENEMY;
	}

	// Update food movement
	update(deltaTime)
	{
		if (this.#state == FoodState.FOOD_FLYING)
		{
			if(this.isOutsideScreen() == false)
			{
				this.#moveFood(deltaTime);
			}
			else
			{
				this.#state = FoodState.FOOD_IDLE;
			}
		}
	}

}

export default Food;
