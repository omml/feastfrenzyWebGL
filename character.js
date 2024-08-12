import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/FBXLoader.js';

const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

class Character {
    #fileName;
    #mixer;
    #x;
    #y;
    #speed;
    #direction;
    #isWalking;
    #idleAction;
    #walkAction;
    #currentAction;
    #model;

    constructor(scene, fileName, x, y) {
        this.#fileName = fileName;
        this.#mixer = null;
        this.#x = x;
        this.#y = y;
        this.#speed = 5; // Speed of the character (units per second)
        this.#direction = new THREE.Vector2(0, 0);
        this.#isWalking = false;
        this.#idleAction = null;
        this.#walkAction = null;
        this.#currentAction = null;
        this.#model = null;

        this.#createCharacter(scene, fileName, x, y);
        this.#setupKeyboardControls();
    }

    #createCharacter(scene, fileName, x, y) {
        const loader = new FBXLoader();
        loader.load('models/fbx/' + fileName + '.fbx', (object) => {

            this.#mixer = new THREE.AnimationMixer(object);
            this.#model = object;

            object.traverse((child) => {
                child.castShadow = true; // Enable shadow casting
                child.receiveShadow = true; // Enable receiving shadows
            });

            const animLoader = new FBXLoader();
            animLoader.load('models/fbx/Idle.fbx', (anim) => {
                this.#idleAction = this.#mixer.clipAction(anim.animations[0]);
                this.#idleAction.play();
                this.#currentAction = this.#idleAction;
            });

            animLoader.load('models/fbx/Walking.fbx', (anim) => {
                this.#walkAction = this.#mixer.clipAction(anim.animations[0]);
            });

            // Set Rotation
            object.rotation.set(THREE.MathUtils.degToRad(90), 0, 0); // X-axis rotation of 90 degrees
            // Set Position
            object.position.set(x, y, -10); // z axis is up
            object.scale.setScalar(0.025);

            scene.add(object);
        });
    }

    #setupKeyboardControls() {
        window.addEventListener('keydown', (event) => this.#onKeyDown(event));
        window.addEventListener('keyup', (event) => this.#onKeyUp(event));
    }

    #onKeyDown(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                this.startMoving(Direction.UP);
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.startMoving(Direction.DOWN);
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.startMoving(Direction.LEFT);
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.startMoving(Direction.RIGHT);
                break;
        }
        this.#updateMovement();
    }

    startMoving(direction) {
        switch (direction) {
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

    #onKeyUp(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
            case 'ArrowDown':
            case 'KeyS':
                this.stopMoving(Direction.UP);
                break;
            case 'ArrowLeft':
            case 'KeyA':
            case 'ArrowRight':
            case 'KeyD':
                this.stopMoving(Direction.LEFT);
                break;
        }
        this.#updateMovement();
    }

    stopMoving(direction) {
        switch (direction) {
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

    #updateMovement() {
        if (this.#direction.lengthSq() > 0) {
            if (!this.#isWalking) {
                this.#switchToWalkAnimation();
            }
        } else {
            if (this.#isWalking) {
                this.#switchToIdleAnimation();
            }
        }
    }

    #moveCharacter(deltaTime) {
        const angle = Math.atan2(this.#direction.y, this.#direction.x) + THREE.MathUtils.degToRad(90);
        if (this.#model) {
            this.#model.rotation.y = angle; // Rotate model to face direction
            this.#model.position.x += this.#direction.x * this.#speed * deltaTime;
            this.#model.position.y += this.#direction.y * this.#speed * deltaTime;
        }
    }

    #switchToWalkAnimation() {
        this.#isWalking = true;
        this.#currentAction.stop();
        this.#currentAction = this.#walkAction;
        this.#currentAction.play();
    }

    #switchToIdleAnimation() {
        this.#isWalking = false;
        this.#currentAction.stop();
        this.#currentAction = this.#idleAction;
        this.#currentAction.play();
    }

    update(deltaTime) {
        if (this.#mixer) {
            this.#mixer.update(deltaTime);
        }
        if (this.#isWalking) {
            this.#moveCharacter(deltaTime);
        }
    }
}

export default Character;
