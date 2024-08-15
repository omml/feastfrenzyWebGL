//
//  food.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 13/Aug/2024.
//
import * as THREE from 'three';

import FoodStatic from './foodStatic.js';
import CharacterPlayer from './characterPlayer.js';

class Food extends FoodStatic {

    #fromPlayer;
    #state;

    //#enemy

    #isCake;

    constructor(scene, fileName, x, y, z, isCake) {
        super(scene, fileName, x, y, z);

        this.#isCake = isCake;
        this.oppositeCollisionObj = [];
    }

    // Set enemies that are opposite, so collision is tested against them
    setOppositeCollisionObj(id) {
        this.oppositeCollisionObj.push(id);
    }

    // Returns food's state
    getState() {
        return this.#state;
    }

    // Returns wheather food is cake
    getIsCake() {
        return this.#isCake;
    }

    setEnemy(e) {
        //#enemy = e;
    }

    setCarriedPosition() {
        const player = CharacterPlayer.getInstance();

        var worldPosition = new THREE.Vector3();
        var worldRotation = new THREE.Quaternion();
        var worldScale = new THREE.Vector3();

        worldPosition = player.getWorldPosition();
        this._model.getWorldQuaternion(worldRotation);
        this._model.getWorldScale(worldScale);

        player.addChildObject(this._model);

        var worldMatrix = new THREE.Matrix4();
        worldMatrix.compose(worldPosition, worldRotation, worldScale);

        // Convert the world transform into local space of the new parent
        var localMatrix = new THREE.Matrix4();
        localMatrix.copy(player.getMatrixWorld()).invert(); // Invert parent's world matrix
        localMatrix.multiply(worldMatrix); // Multiply by world matrix of object B

        // Decompose the result into position, rotation, and scale
        localMatrix.decompose(this._model.position, this._model.quaternion, this._model.scale);

        this._model.position.z += 25;
        this._model.position.y += 180;
    }

    setFreePosition(){
        const player = CharacterPlayer.getInstance();

        // Get the current world position, rotation, and scale of the model
        var worldPosition = new THREE.Vector3();
        var worldRotation = new THREE.Quaternion();
        var worldScale = new THREE.Vector3();
        var worldMatrix = new THREE.Matrix4();

        this._model.getWorldPosition(worldPosition);
        this._model.getWorldQuaternion(worldRotation);
        this._model.getWorldScale(worldScale);

        var rotation = new THREE.Euler().setFromQuaternion( worldRotation);

        player.removeChildObject(this._model);

        this._model.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
        this._model.rotation.set(rotation.x, rotation.y, rotation.z);
        this._model.scale.setScalar(worldScale.x);

        this._scene.add(this._model);

    }

}

export default Food;
