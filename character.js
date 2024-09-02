//
//  character.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 12/Aug/2024.
//
import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/FBXLoader.js';
import { Direction } from './commonDefinitions.js';

class Character
{
	#fileName;
	#mixer;
	#x;
	#y;
	#scale;
	#speed;
	#direction;
	#directionBeforeStopping;
	#isWalking;
	#isCarrying;
	#isThrowing;
	#isCatching;
	#idleAction;
	#idleHoldAction;
	#walkAction;
	#walkHoldAction;
	#throwAction
	#catchAction
	#currentAction;
	_model;
	actions;

	constructor(scene, fileName, x, y, s)
	{
		this.#fileName = fileName;
		this.#mixer = null;
		this.#x = x;
		this.#y = y;
		this.#speed = 5; // Speed of the character (units per second)
		this.#direction = new THREE.Vector2(0, -1);
		this.#directionBeforeStopping = new THREE.Vector2(0, -1);
		this.#isWalking = false;
		this.#isThrowing = false;
		this.#isCatching = false;
		this.#isCarrying = false;
		this.#idleAction = null;
		this.#idleHoldAction = null;
		this.#walkAction = null;
		this.#walkHoldAction = null;
		this.#throwAction = null;
		this.#catchAction = null;
		this.#currentAction = null;
		this._model = null;
		this.#scale = s;
		this.actions = {}; // Store all actions by name or index

		this.#createCharacter(scene, fileName, x, y);
	}

	#createCharacter(scene, fileName, x, y)
	{
		const loader = new FBXLoader();
		loader.load('models/fbx/' + fileName + '.fbx', (object) =>
		{

			this.#mixer = new THREE.AnimationMixer(object);
			this._model = object;

			object.traverse((child) =>
			{
				child.castShadow = true; // Enable shadow casting
				child.receiveShadow = true; // Enable receiving shadows
			});

			const animLoader = new FBXLoader();
			// Idle animation
			animLoader.load('models/fbx/Idle.fbx', (anim) =>
			{
				this.#idleAction = this.#mixer.clipAction(anim.animations[0]);
				this.#currentAction = this.#idleAction;
				this.#idleAction.play();

				this.storeAnimationNames(this.#idleAction, 'idle');
			});

			// Idle hold animation
			animLoader.load('models/fbx/IdleHold.fbx', (anim) =>
			{
				this.#idleHoldAction = this.#mixer.clipAction(anim.animations[0]);

				this.storeAnimationNames(this.#idleHoldAction, 'idleHold');
			});

			// Walk animation
			animLoader.load('models/fbx/Walking.fbx', (anim) =>
			{
				this.#walkAction = this.#mixer.clipAction(anim.animations[0]);

				this.storeAnimationNames(this.#walkAction, 'walking');
			});

			// Walk hold animation
			animLoader.load('models/fbx/WalkHold.fbx', (anim) =>
			{
				this.#walkHoldAction = this.#mixer.clipAction(anim.animations[0]);

				this.storeAnimationNames(this.#walkHoldAction, 'walkingHold');
			});

			// Throw animation
			animLoader.load('models/fbx/Throw.fbx', (anim) =>
			{
				this.#throwAction = this.#mixer.clipAction(anim.animations[0]);
				this.#throwAction.setLoop(THREE.LoopOnce);
				this.#mixer.addEventListener('finished', (event) =>
				{
					if (this.#isThrowing)
					{
						this.#switchToIdleAnimation();
					}
				});

				this.storeAnimationNames(this.#throwAction, 'throw');
			});

			// Catch animation
			animLoader.load('models/fbx/Throw.fbx', (anim) =>
			{
				this.#catchAction = this.#mixer.clipAction(anim.animations[0]);
				this.#catchAction.timeScale = -1;
				this.#catchAction.time = anim.animations[0].duration;
				this.#catchAction.setLoop(THREE.LoopOnce);
				this.#mixer.addEventListener('finished', (event) =>
				{
					if (this.#isCatching)
					{
						this.#switchToIdleHoldAnimation();
					}
				});

				this.storeAnimationNames(this.#catchAction, 'catch');
			});

			// Set Rotation
			object.rotation.set(THREE.MathUtils.degToRad(90), 0, 0); // X-axis rotation of 90 degrees
			// Set Position
			object.position.set(x, y, -10); // z axis is up
			object.scale.setScalar(this.#scale);

			scene.add(object);
		});
	}

	// Used for debugging to check which animation is currently playing
	storeAnimationNames(action, name)
	{
		this.actions[name] = action;
	}

	// Gets current animation
	getCurrentPlayingAnimation() {
        for (const name in this.actions) {
            if (this.actions[name] == this.#currentAction) {
                return name; // Return the modified name of the currently playing animation
            }
        }
        return null; // Return null if no animation is currently playing
    }

	// Starts moving towards a direction
	startMoving(direction)
	{
		switch (direction)
		{
			case Direction.UP:
				this.#direction.set(0, 1);
				break;
			case Direction.DOWN:
				this.#direction.set(0, -1);
				break;
			case Direction.LEFT:
				this.#direction.set(-1, 0);
				break;
			case Direction.RIGHT:
				this.#direction.set(1, 0);
				break;
		}
		this.#updateMovement();
	}

	// Stops moving
	stopMoving(direction)
	{
		this.#directionBeforeStopping.x = this.#direction.x;
		this.#directionBeforeStopping.y = this.#direction.y;

		switch (direction)
		{
			case Direction.UP:
			case Direction.DOWN:
				this.#direction.y = 0;
				break;
			case Direction.LEFT:
			case Direction.RIGHT:
				this.#direction.x = 0;
				break;
		}
		this.#updateMovement();
	}

	// Switch to throw or catch animation
	throwInCatch()
	{
		if (this.#isCarrying)
		{
			this.#switchToThrowAnimation();
		} else
		{
			this.#switchToCatchAnimation();
		}
	}

	// Update movement
	#updateMovement()
	{
		//if (this.#isCatching == false && this.#isThrowing == false)
		{
			if (this.#direction.lengthSq() > 0)
			{
				if (!this.#isWalking)
				{
					if (this.#isCarrying)
					{
						this.#switchToWalkHoldAnimation();
					} else
					{
						this.#switchToWalkAnimation();
					}
				}
			} else
			{
				if (this.#isWalking)
				{
					if (this.#isCarrying)
					{
						this.#switchToIdleHoldAnimation();
					} else
					{
						this.#switchToIdleAnimation();
					}
				}
			}
		}
	}

	// Move character
	#moveCharacter(deltaTime)
	{
		const angle = Math.atan2(this.#direction.y, this.#direction.x) + THREE.MathUtils.degToRad(90);
		if (this._model)
		{
			this._model.rotation.y = angle; // Rotate model to face direction
			this._model.position.x += this.#direction.x * this.#speed * deltaTime;
			this._model.position.y += this.#direction.y * this.#speed * deltaTime;
		}
	}

	// Switch to walk animation
	#switchToWalkAnimation()
	{
		if(this.#currentAction != this.#walkAction)
		{
			this.#isWalking = true;
			this.#currentAction.stop();
			this.#currentAction = this.#walkAction;
			this.#currentAction.play();
		}
	}

	// Switch to walk while holding animation
	#switchToWalkHoldAnimation()
	{
		if(this.#currentAction != this.#walkHoldAction)
		{
			this.#isWalking = true;
			this.#currentAction.stop();
			this.#currentAction = this.#walkHoldAction;
			this.#currentAction.play();
		}
	}

	// Switch to idle animation
	#switchToIdleAnimation()
	{
		if(this.#currentAction != this.#idleAction)
		{
			this.#isWalking = false;
			this.#currentAction.stop();
			this.#currentAction = this.#idleAction;
			this.#currentAction.play();
			this.#isThrowing = false;
			this.#isCarrying = false;
		}
	}

	// Switch to idle while holding animation
	#switchToIdleHoldAnimation()
	{
		if(this.#currentAction != this.#idleHoldAction)
		{
			this.#isWalking = false;
			this.#currentAction.stop();
			this.#currentAction = this.#idleHoldAction;
			this.#currentAction.play();
			this.#isCatching = false;
			this.#isCarrying = true;
		}
	}

	// Switch to throw animation
	#switchToThrowAnimation()
	{
		this.#isThrowing = true;
		this.#isWalking = false;
		this.#currentAction.stop();
		this.#currentAction = this.#throwAction;
		this.#currentAction.play();
	}

	// Switch to catch animation
	#switchToCatchAnimation()
	{
		this.#isCatching = true;
		this.#isWalking = false;
		this.#currentAction.stop();
		this.#currentAction = this.#catchAction;
		this.#currentAction.play();
	}

	// Check if is throwing
	isThrowing()
	{
		return this.#isThrowing;
	}

	/*
	hasFinishedThrowing()
	{
		let retVal = false;

		if(this.#isThrowing)
		{
			let currTime = this.getCurrentActionTime();
			let dur = this.getCurrentActionDuration();
			if( currTime >= dur)
			{
				this.#isThrowing = false;
				retVal = true;
			}
		}

		return retVal;
	}
	*/

	isCatching()
	{
		return this.#isCatching;
	}

	// Change to carrying animations
	setIsCarrying(value)
	{
		if(value)
		{
			this.#switchToIdleHoldAnimation();
		}
		else
		{
			this.#switchToIdleAnimation();
		}
	}

	// Adds a child object
	addChildObject(obj)
	{
		this._model.add(obj);
	}

	// Removes child object
	removeChildObject(obj)
	{
		this._model.remove(obj);
	}

	// Gets the world matrix
	getMatrixWorld()
	{
		return this._model.matrixWorld;
	}

	// Gets rotation
	getQuaternion()
	{
		return this._model.quaternion;
	}

	// Gets scale
	getScale()
	{
		return this._model.scale;
	}

	// Gets world position
	getWorldPosition()
	{
		var worldPosition = new THREE.Vector3();

		this._model.getWorldPosition(worldPosition);

		return worldPosition;
	}

	// Gets direction
	getDirection()
	{
		return this.#direction;
	}

	// Gets the direction stored before it stopped
	getDirectionBeforeStopping()
	{
		return this.#directionBeforeStopping;
	}

	// Gets current animation time
	getCurrentActionTime()
	{
		return this.#currentAction.time;
	}

	// Gets current animation duration
	getCurrentActionDuration()
	{
		return this.#currentAction.getClip().duration;
	}

	// Gets current animation
	getCurrentAction()
	{
		return this.#currentAction;
	}

	// Used to know when throwing animatino has finished
	isIdle()
	{
		return this.#currentAction == this.actions['idle'];
	}

	// Updates animation
	update(deltaTime)
	{
		if (this.#mixer)
		{
			this.#mixer.update(deltaTime);
		}
		if (this.#isWalking)
		{
			this.#moveCharacter(deltaTime);
		}
	}
}

export default Character;
