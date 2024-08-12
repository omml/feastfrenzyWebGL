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
        if(super.isThrowing() == false && super.isCatching() == false){
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
                case 'Space':
                    this.throwInCatch();
                    break;
            }
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

    #checkPlayingArea(){
        if (this._model.position.x > 24.5){
            this._model.position.x = 24.5;
        }
        if (this._model.position.x < -22.5){
            this._model.position.x = -22.5;
        }
        if (this._model.position.y > 14){
            this._model.position.y = 14;
        }
        if (this._model.position.y < -3.5){
            this._model.position.y = -3.5;
        }
    }

    update(deltaTime){
        if(this._model){
            this.#checkPlayingArea();
        }
        super.update(deltaTime);
    }
}

export default CharacterPlayer;
