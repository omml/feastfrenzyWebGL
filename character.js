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
	#isWalking;
	#isCarring;
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

	constructor(scene, fileName, x, y, s)
	{
		this.#fileName = fileName;
		this.#mixer = null;
		this.#x = x;
		this.#y = y;
		this.#speed = 5; // Speed of the character (units per second)
		this.#direction = new THREE.Vector2(0, -1);
		this.#isWalking = false;
		this.#isThrowing = false;
		this.#isCatching = false;
		this.#isCarring = false;
		this.#idleAction = null;
		this.#idleHoldAction = null;
		this.#walkAction = null;
		this.#walkHoldAction = null;
		this.#throwAction = null;
		this.#catchAction = null;
		this.#currentAction = null;
		this._model = null;
		this.#scale = s;

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
				this.#idleAction.play();
				this.#currentAction = this.#idleAction;
			});

			// Idle hold animation
			animLoader.load('models/fbx/IdleHold.fbx', (anim) =>
			{
				this.#idleHoldAction = this.#mixer.clipAction(anim.animations[0]);
				this.#idleHoldAction.play();
				this.#currentAction = this.#idleHoldAction;
			});

			// Walk animation
			animLoader.load('models/fbx/Walking.fbx', (anim) =>
			{
				this.#walkAction = this.#mixer.clipAction(anim.animations[0]);
			});

			// Walk hold animation
			animLoader.load('models/fbx/WalkHold.fbx', (anim) =>
			{
				this.#walkHoldAction = this.#mixer.clipAction(anim.animations[0]);
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
						this.#catchAction.timeScale = -1;
						this.#catchAction.time = anim.animations[0].duration;
						this.#switchToIdleAnimation();
					}
				});
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
			});

			// Set Rotation
			object.rotation.set(THREE.MathUtils.degToRad(90), 0, 0); // X-axis rotation of 90 degrees
			// Set Position
			object.position.set(x, y, -10); // z axis is up
			object.scale.setScalar(this.#scale);

			scene.add(object);
		});
	}

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

	stopMoving(direction)
	{
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

	throwInCatch()
	{
		if (this.#isCarring)
		{
			this.#switchToThrowAnimation();
		} else
		{
			this.#switchToCatchAnimation();
		}
	}

	#updateMovement()
	{
		if (this.#isCatching == false && this.#isThrowing == false)
		{
			if (this.#direction.lengthSq() > 0)
			{
				if (!this.#isWalking)
				{
					if (this.#isCarring)
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
					if (this.#isCarring)
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

	#switchToWalkAnimation()
	{
		this.#isWalking = true;
		this.#currentAction.stop();
		this.#currentAction = this.#walkAction;
		this.#currentAction.play();
	}

	#switchToWalkHoldAnimation()
	{
		this.#isWalking = true;
		this.#currentAction.stop();
		this.#currentAction = this.#walkHoldAction;
		this.#currentAction.play();
	}

	#switchToIdleAnimation()
	{
		this.#isWalking = false;
		this.#currentAction.stop();
		this.#currentAction = this.#idleAction;
		this.#currentAction.play();
		this.#isThrowing = false;
		this.#isCarring = false;
	}

	#switchToIdleHoldAnimation()
	{
		this.#isWalking = false;
		this.#currentAction.stop();
		this.#currentAction = this.#idleHoldAction;
		this.#currentAction.play();
		this.#isCatching = false;
		this.#isCarring = true;
	}

	#switchToThrowAnimation()
	{
		this.#isThrowing = true;
		this.#isWalking = false;
		this.#currentAction.stop();
		this.#currentAction = this.#throwAction;
		this.#currentAction.play();
	}

	#switchToCatchAnimation()
	{
		this.#isCatching = true;
		this.#isWalking = false;
		this.#currentAction.stop();
		this.#currentAction = this.#catchAction;
		this.#currentAction.play();
	}

	isThrowing()
	{
		return this.#isThrowing;
	}

	isCatching()
	{
		return this.#isCatching;
	}

	addChildObject(obj)
	{
		this._model.add(obj);
	}

	removeChildObject(obj)
	{
		this._model.remove(obj);
	}

	getMatrixWorld()
	{
		return this._model.matrixWorld;
	}

	getQuaternion()
	{
		return this._model.quaternion;
	}

	getScale()
	{
		return this._model.scale;
	}

	getWorldPosition()
	{
		var worldPosition = new THREE.Vector3();

		this._model.getWorldPosition(worldPosition);

		return worldPosition;
	}

	getDirection()
	{
		return this.#direction;
	}

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
