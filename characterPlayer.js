//
//  characterPlayer.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 12/Aug/2024.
//
import * as THREE from 'three';
import Character from "./character.js";
import { Direction } from './commonDefinitions.js';

class CharacterPlayer extends Character {

    constructor(scene) {
        if (CharacterPlayer.instance) {
            return CharacterPlayer.instance;
        }

        // Initialize properties with parameters
        if (!scene) {
            throw new Error("Initial instantiation requires an scene.");
        }

        super(scene, 'Aj', 0, 0, 0.025);

        this.#setupKeyboardControls();

        // Cache the instance
        CharacterPlayer.instance = this;
    }

    // Static method to get the single instance of the class
    static getInstance(scene) {
        if (!CharacterPlayer.instance) {
            if (!scene) {
                throw new Error("getInstance requires an scene for the first call.");
            }
            CharacterPlayer.instance = new CharacterPlayer(scene);
        }
        return CharacterPlayer.instance;
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
