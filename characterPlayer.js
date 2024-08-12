import * as THREE from 'three';
import Character from "./character.js";
import { Direction } from './commonDefinitions.js';

class CharacterPlayer extends Character {

    constructor(scene, fileName, x, y) {
        super(scene, fileName, x, y);

        this.#setupKeyboardControls();
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
    }
}

export default CharacterPlayer;
