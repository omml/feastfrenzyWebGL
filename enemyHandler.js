//
//  enemyHandler.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 29/Aug/2024.
//
import * as THREE from 'three';
import CharacterEnemy from "./characterEnemy.js";
import { Direction, EnemyState, FoodState, getRandomInt, NUM_ENEMIES } from './commonDefinitions.js';

class EnemyHandler
{
	#enemies = []; //NUM_ENEMIES
	#originalDirection = []; //NUM_ENEMIES
	#states = []; //4
	#screenPosition;
	#moveDirection;
	#xPosIni;
	#yPosIni;
	#posXMin;
	#posXMax;
	#posYMin;
	#posYMax;
	#foodHandler;
	#initialized;
	loopLimit = 1;

	constructor(scene, direction)
	{
		this.create(scene, direction);
	}

	create(scene, screenPosition)
	{
		this.#initialized = false;
		this.#screenPosition = screenPosition;
		let enemyName;

		switch (this.#screenPosition)
		{
		case Direction.UP:
			break;
		case Direction.DOWN:
			break;
		case Direction.LEFT:
			// Sets initial movement limits and direction for the left side of the screen
			this.#posXMin = -34;
			this.#posXMax = -26.5;
			this.#posYMin = 0;
			this.#posYMax = 14;
			// Enemy will move from out of the screen to appear
			this.#moveDirection = Direction.RIGHT;
			break;
		case Direction.RIGHT:
			// Sets initial movement limits and direction for the right side of the screen
			this.#posXMin = 34;
			this.#posXMax = 28.5;
			this.#posYMin = 0;
			this.#posYMax = 14;
			// Enemy will move from out of the screen to appear
			this.#moveDirection = Direction.LEFT;
			break;
		}
		//Create enemies
		for (let i = 0; i < NUM_ENEMIES; i++)
		{
			// Select girl or granma
			let enemyType = getRandomInt(0, 100);

			switch (this.#screenPosition)
			{
			case Direction.UP:
				break;
			case Direction.DOWN:
				break;
			case Direction.LEFT:
				// Sets initial position, position in Y axis is set randomly
				this.#yPosIni = getRandomInt(this.#posYMin,this.#posYMax);
				this.#xPosIni = -34;
				break;
			case Direction.RIGHT:
				// Sets initial position, position in Y axis is set randomly
				this.#yPosIni = getRandomInt(this.#posYMin, this.#posYMax);
				this.#xPosIni = 34;
				break;
			}

			this.#originalDirection[i] = this.#moveDirection;

			if ( enemyType < 50)
			{
				enemyName = "Claire";
			}
			else
			{
				enemyName = "Granny";
			}

			let enemy = new CharacterEnemy(scene, enemyName, this.#xPosIni, this.#yPosIni, this.#screenPosition);
			enemy.setCurrentDirection(this.#moveDirection);
			enemy.setLimits(this.#posXMax, this.#posYMax);
			this.#enemies[i] = enemy;

			
			// Each enemy is associated with a food object, the food object changes sprite
			//this.#foodHandler.getFood(i).setEnemy(this.#enemies[i]);
			//this.#enemies[i].SetFood(this.#foodHandler.getFood(i));
		}
	}

	setFoodHandler(foodHandler)
	{
		this.#foodHandler = foodHandler;
	}

	getEnemy(index)
	{
		return this.#enemies[index];
	}

	start()
	{
		//int loopLimit = DifficultyHandler::GetInstance().GetNumEnemies();

		for (let i = 0; i < this.loopLimit; i++)
		{
			const foodTmp = this.#foodHandler.getFood(i);
			foodTmp.setEnemy(this.#enemies[i]);
			this.#enemies[i].setIsCarrying(true);
			this.#enemies[i].setFood(this.#foodHandler.getFood(i));
			this.#enemies[i].startMoving(this.#moveDirection);
		}

		this.#initialized = true;
	}

	update(deltaTime)
	{
		if(this.#initialized)
		{
			//int loopLimit = DifficultyHandler::GetInstance().GetNumEnemies();

			for (let i = 0; i < this.loopLimit; i++)
			{
				// If enemy is out of the screen and food as well
				// of if enemy is out of screen and food was catched
				// restart the enemy, if the food went out of the screen enemy will
				// throw it again, if not enemy will just wander to be hit
				//if (this.#enemies[i].getState() == EnemyState.ENEMY_IDLE && (_enemies[i].GetFoodState() == FOOD_IDLE || _enemies[i].GetFoodState() == FOOD_CARRIED_PLAYER))
				
				if (this.#enemies[i].getState() == EnemyState.ENEMY_IDLE && (this.#enemies[i].getFoodState() == FoodState.FOOD_IDLE || this.#enemies[i].getFoodState() == FoodState.FOOD_CARRIED_PLAYER))
				//if (this.#enemies[i].getState() == EnemyState.ENEMY_IDLE)
				{	
					// Set initial limits
					this.#enemies[i].setLimits(this.#posXMax, 0);
					// Set original direction
					this.#enemies[i].setCurrentDirection(this.#originalDirection[i]);

					// Food is not being carried by player, then it can be changed
					if(this.#enemies[i].getFoodState() != FoodState.FOOD_CARRIED_PLAYER)
					{
						this.#foodHandler.changeFoodObject(i);
						const foodTmp = this.#foodHandler.getFood(i);
						foodTmp.setEnemy(this.#enemies[i]);
						this.#enemies[i].setFood(this.#foodHandler.getFood(i));
					}
					// Restart, set a flag if enemy's food was catched
					this.#enemies[i].reSpawn(this.#originalDirection[i], this.#enemies[i].getFoodState() != FoodState.FOOD_CARRIED_PLAYER);
				}
				else
				{
					this.#enemies[i].update(deltaTime);
				}
			}
		}
	}

	reStart()
	{

	}

}

export default EnemyHandler;