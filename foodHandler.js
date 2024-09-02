//
//  foodHandler.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 16/Aug/2024.
//
import * as THREE from 'three';

import Food from './food.js';
import { FoodFiles } from './commonDefinitions.js';
import { NUM_ENEMIES, getRandomInt } from './commonDefinitions.js';

class FoodHandler
{
	#foodObjects = [];
	#foodObjectTaken = [];
	#food = [];
	#initialized;
	#enemyFoodIndex = [];

	constructor(scene)
	{
		let n = 0;
		let z = 0;

		// Create a pool of food objects
		this.#foodObjects[0] = new Food(scene, FoodFiles.BIRTHDAYCAKE, n, n, z, true, false);
		this.#foodObjects[1] = new Food(scene, FoodFiles.BURGER, n, n, z, false, false);
		this.#foodObjects[2] = new Food(scene, FoodFiles.DONUT, n, n, z, false, false);
		this.#foodObjects[3] = new Food(scene, FoodFiles.MELON, n, n, z, false, false);
		this.#foodObjects[4] = new Food(scene, FoodFiles.MILKSHAKE, n, n, z, false, false);
		this.#foodObjects[5] = new Food(scene, FoodFiles.PIZZA, n, n, z, false, false);
		this.#foodObjects[6] = new Food(scene, FoodFiles.PUMKIN, n, n, z, false, false);
		this.#foodObjects[7] = new Food(scene, FoodFiles.TOMATO, n, n, z, false, false);

		this.#foodObjects[8] = new Food(scene, FoodFiles.BIRTHDAYCAKE, n, n, z, true, false);
		this.#foodObjects[9] = new Food(scene, FoodFiles.BURGER, n, n, z, false, false);
		this.#foodObjects[10] = new Food(scene, FoodFiles.DONUT, n, n, z, false, false);
		this.#foodObjects[11] = new Food(scene, FoodFiles.MELON, n, n, z, false, false);
		this.#foodObjects[12] = new Food(scene, FoodFiles.MILKSHAKE, n, n, z, false, false);
		this.#foodObjects[13] = new Food(scene, FoodFiles.PIZZA, n, n, z, false, false);
		this.#foodObjects[14] = new Food(scene, FoodFiles.PUMKIN, n, n, z, false, false);
		this.#foodObjects[15] = new Food(scene, FoodFiles.TOMATO, n, n, z, false, false);

		this.#foodObjects[16] = new Food(scene, FoodFiles.BIRTHDAYCAKE, n, n, z, true, false);
		this.#foodObjects[17] = new Food(scene, FoodFiles.BURGER, n, n, z, false, false);
		this.#foodObjects[18] = new Food(scene, FoodFiles.DONUT, n, n, z, false, false);
		this.#foodObjects[19] = new Food(scene, FoodFiles.MELON, n, n, z, false, false);
		this.#foodObjects[20] = new Food(scene, FoodFiles.MILKSHAKE, n, n, z, false, false);
		this.#foodObjects[21] = new Food(scene, FoodFiles.PIZZA, n, n, z, false, false);
		this.#foodObjects[22] = new Food(scene, FoodFiles.PUMKIN, n, n, z, false, false);
		this.#foodObjects[23] = new Food(scene, FoodFiles.TOMATO, n, n, z, false, false);

		this.#foodObjects[24] = new Food(scene, FoodFiles.BIRTHDAYCAKE, n, n, z, true, false);
		this.#foodObjects[25] = new Food(scene, FoodFiles.BURGER, n, n, z, false, false);
		this.#foodObjects[26] = new Food(scene, FoodFiles.DONUT, n, n, z, false, false);
		this.#foodObjects[27] = new Food(scene, FoodFiles.MELON, n, n, z, false, false);
		this.#foodObjects[28] = new Food(scene, FoodFiles.MILKSHAKE, n, n, z, false, false);
		this.#foodObjects[29] = new Food(scene, FoodFiles.PIZZA, n, n, z, false, false);
		this.#foodObjects[30] = new Food(scene, FoodFiles.PUMKIN, n, n, z, false, false);
		this.#foodObjects[31] = new Food(scene, FoodFiles.TOMATO, n, n, z, false, false);

		for(let i = 0; i < this.#foodObjects.length; i++)
		{
			this.#foodObjectTaken[i] = false;
		}
	}

	// Get food by index
	getFood(index)
	{
		return this.#food[index];
	}

	// Set enemies that are opposite, so collision is tested against them
	setOppositeCollisionObj(id)
	{
		this.oppositeCollisionObj.push(id);
	}

	// Find a food object from the pool
	findFoodObject(enemyIndex)
	{
		let r = getRandomInt(0,this.#foodObjectTaken.length);

		while(this.#foodObjectTaken[r] == true)
		{
			r = getRandomInt(0,this.#foodObjectTaken.length);
		}

		this.#foodObjectTaken[r] = true;

		return r;
	}

	// Changes the food object of an enemy
	changeFoodObject(enemyIndex)
	{
		let r = this.findFoodObject(enemyIndex);

		this.#foodObjectTaken[this.#enemyFoodIndex[enemyIndex]] = false;
		this.#food[enemyIndex] = this.#foodObjects[r];
		this.#enemyFoodIndex[enemyIndex] = r;
	}

	// Starts the food objects
	start(scene)
	{
		let n = 0;
		let z = 0;

		for (let i = 0; i < NUM_ENEMIES; i++)
		{
			// Selects a random object
			let r = this.findFoodObject(i);

			this.#food[i] = this.#foodObjects[r];
			this.#enemyFoodIndex[i] = r;
		}

		this.#initialized = true;
	}

	// Updates food movement
	update(deltaTime)
	{
		if(this.#initialized)
		{
			for (let i = 0; i < NUM_ENEMIES; i++)
			{
				this.#food[i].update(deltaTime);
			}
		}
	}
}

export default FoodHandler;
