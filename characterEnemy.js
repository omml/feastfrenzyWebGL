//
//  characterEnemy.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 23/Aug/2024.
//
import * as THREE from 'three';
import Character from "./character.js";
import { Direction, EnemyState, getRandomInt } from './commonDefinitions.js';

class CharacterEnemy extends Character
{
	#food;
	#screenSide;
	#enemyState;
	#xLimit;
	#yLimit;
	#counter;
	#maxCounter;
	#restartFood;
	#currentDirection;
	#oldDirection;

	constructor(scene, fileName, x, y, screenSide)
	{
		// Initialize properties with parameters
		if (!scene)
		{
			throw new Error("Initial instantiation requires an scene.");
		}

		super(scene, fileName, x, y,  0.025);
		this.#screenSide = screenSide;
		this.#enemyState = EnemyState.ENEMY_INIT;
		this.#counter = 0;
		this.#maxCounter = getRandomInt(1, 4);
		this.#restartFood = true;
		this.#xLimit = 0;
		this.#yLimit = 0;
		this.#currentDirection = Direction.DOWN;

		setTimeout(() => this.throwInCatch(), 5000);
	}

	// Gets enemy state
	getState()
	{
		return this.#enemyState;
	}

	// Sets the food
	setFood(food)
	{
		this.#food = food;
	}

	// Sets moving limits
	setLimits(x, y)
	{
		this.#xLimit = x;
		this.#yLimit = y;
	}
	
	// Checks if enemy has reached limits
	hasReachedLimit()
	{
		let retVal = false;

		
		// Gets the current position depending on the direction
		let pos = this._model.position;

		// Checks depending on the enemy direction
		switch (this.#currentDirection)
		{
		case Direction.RIGHT:
			if (pos.x >= this.#xLimit)
			{
				retVal = true;
			}
			break;
		case Direction.LEFT:
			if (pos.x <= this.#xLimit)
			{
				retVal = true;
			}
			break;
		case Direction.UP:
			if (pos.y >= this.#yLimit)
			{
				retVal = true;
			}
			break;
		case Direction.DOWN:
			if (pos.y <= this.#yLimit)
			{
				retVal = true;
			}
			break;
		}

		return retVal;
	}

	// Launches food
	launchFood()
	{
		this.throwInCatch();
		this.#food.throwFood(this, false); 
	}

	// Changes position so it comes from a different postition from out of the screen
	changeInitPosition()
	{
		let xPosIni, yPosIni, posXMin, posXMax, posYMin, posYMax;
		xPosIni = 0;
		yPosIni = 0;

		switch (this.#screenSide)
		{
		case Direction.UP:
			break;
		case Direction.DOWN:
			break;
		case Direction.LEFT:
			posXMin = -34;
			posXMax = -34;
			posYMin = -3.5;
			posYMax = 14;

			yPosIni = getRandomInt(posYMin, posYMax);
			xPosIni = -34;
			break;
		case Direction.RIGHT:
			posXMin = 34;
			posXMax = 34;
			posYMin = -3.5;
			posYMax = 14;
			yPosIni = getRandomInt(posYMin, posYMax);
			xPosIni = 34;
			break;
		}
		this._model.position.set(xPosIni, yPosIni, -10);
	}

	// Sets the direction is moving towards
	setCurrentDirection(cd)
	{
		this.#currentDirection = cd;
		this.#oldDirection = cd;
	}

	// Gets the food
	getFood()
	{
		return this.#food;
	}

	// Gets the food state
	getFoodState()
	{
		return this.#food.getFoodState();
	}

	// Respans the enemy after it finished
	reSpawn( dir, resFood)
	{
		this.#enemyState = EnemyState.ENEMY_INIT;
		this.#maxCounter = getRandomInt(1, 4);
		this.#restartFood = resFood;
		if (this.#restartFood == true)
		{
			// Next time it respawns set animation walking holding again the food
			this.#food.reStart();
			this.setIsCarrying(true);
		}

		setTimeout(() => this.startMoving(this.#currentDirection), getRandomInt(1000, 5000));
	}

	// Updates animation
	update(deltaTime)
	{
		if(this._model)
		{
			let r = 0;

			// For debugging animations
			//console.log(this.getCurrentPlayingAnimation());

			// Does something depending on the state
			switch (this.#enemyState)
			{
			case EnemyState.ENEMY_INIT:

				// Moves near the table
				if (this.hasReachedLimit())
				{
					// Stops moving
					this.stopMoving(this.#currentDirection);

					// Changes to the next state
					// Player is not holding the food
					if (this.#restartFood == true)
					{
						this.#enemyState = EnemyState.ENEMY_PREPARE_ATTACK;
					}
					else
					{
						this.#enemyState = EnemyState.ENEMY_CHANGE_DIRECTION;
					}
					super.update(deltaTime);
				}
				else
				{
					super.update(deltaTime);
				}
				break;
			case EnemyState.ENEMY_PREPARE_ATTACK:

				// Changes the state to let do the throwing animation
				this.#enemyState = EnemyState.ENEMY_ATTACK;
				
				// Throws the food
				this.launchFood();

				break;
			case EnemyState.ENEMY_ATTACK:
				// Display the throw animation and wait for it to finish
				if(this.isIdle())
				{
					// It has finished the throw animation, change state
					this.#enemyState = EnemyState.ENEMY_CHANGE_DIRECTION;
				}
				else
				{
					super.update(deltaTime);
				}
				break;
			case EnemyState.ENEMY_CHANGE_DIRECTION:
				
				// Decide randmly to go up or down
				r = getRandomInt(0, 100);

				if (r < 50)
				{
					// Move up
					this.startMoving(Direction.UP);
					// Sets the limits so it changes state when reaches them
					this.setLimits(100, 14);
					// Changes the state and direction
					this.#enemyState = EnemyState.ENEMY_MOVE_UP;
					this.#currentDirection = Direction.UP;
				}
				else
				{
					// Move down
					this.startMoving(Direction.DOWN);
					// Sets the limits so it changes state when reaches them
					this.setLimits(100, -3.5);
					// Changes the state and direction
					this.#enemyState = EnemyState.ENEMY_MOVE_DOWN;
					this.#currentDirection = Direction.DOWN;
				}
				//super.update(deltaTime);
				break;
			case EnemyState.ENEMY_MOVE_DOWN:
			case EnemyState.ENEMY_MOVE_UP:
				// Check if has reached the limit
				if (this.hasReachedLimit())
				{
					// It reached the limit
					// Increase the counter of loops
					this.#counter++;
					// Check if the loops are more than the max, the max is set randomly
					if (this.#counter > this.#maxCounter)
					{
						// Move out of the screen acoording to the side of the screen it appeared from 
						this.startMoving(this.#screenSide);
						// Set all to move out of the screen
						switch (this.#screenSide)
						{
						case Direction.RIGHT:
							this.setLimits(34, 500);
							this.#currentDirection = Direction.RIGHT;
							break;
						case Direction.LEFT:
							this.setLimits(-34, 500);
							this.#currentDirection = Direction.LEFT;
							break;
						}
						this.#enemyState = EnemyState.ENEMY_END;
					}
					else
					{
						// Finished current loop, change direction
						this.#enemyState = EnemyState.ENEMY_CHANGE_DIRECTION;
					}
				}
				else
				{
					super.update(deltaTime);
				}
				break;
			case EnemyState.ENEMY_END:
				if (this.hasReachedLimit())
				{
					// It is out of the screen stop animation
					this.stopMoving(this.#currentDirection);
					// Calculate new position to come back again
					this.changeInitPosition();

					// Wait for enemy handler to restart this enemy
					this.#enemyState = EnemyState.ENEMY_IDLE;
				}
				else
				{
					// Keep moving to get out of the screen
					super.update(deltaTime);
				}
				break;
			}
		}
	}
}

export default CharacterEnemy;
