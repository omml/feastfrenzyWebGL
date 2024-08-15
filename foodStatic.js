//
//  foodStatic.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 14/Aug/2024.
//
import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/MTLLoader.js';

class FoodStatic {
    #fileName;
    #x;
    #y;
    _model;

    constructor(scene, fileName, x, y, z, yRot = 0) {
        this.#fileName = fileName;
        this.#x = x;
        this.#y = y;
        this._model = null;

        this.#createFood(scene, fileName, x, y, z, yRot);
    }

    #createFood(scene, fileName, x, y, z, yRot) {

        // Load materials
        const mtlLoader = new MTLLoader();
        mtlLoader.load('models/obj/' + fileName + '.mtl', (materials) => {
            materials.preload();

            // Load OBJ model
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('models/obj/' + fileName + '.obj', (object) => {
                this._model = object;
                // Set Rotation
                object.rotation.set(THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(yRot), 0);
                // Set Position
                object.position.set(x, y, z); // z axis is up
                object.scale.setScalar(3);
                scene.add(object);
            });

            
        });
    }

    getModel(){
        //return this._model;
    }

    setPosition(x, y, z){
        //this._model.position.set(x, y, z);
    }

    reuse(scene, x, y, z, yRot = 0, delay = 100) {
        const retryIfNeeded = () => {
            if (this._model) {
                const newObj = this._model.clone();
                newObj.position.set(x, y, z);
                newObj.rotation.set(THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(yRot), 0); // X-axis rotation of 90 degrees
                scene.add(newObj);
                return newObj;
            } else {
                console.log('Model not loaded yet, retrying...');
                setTimeout(retryIfNeeded, delay);
            }
        };
    
        return retryIfNeeded();
    }
}

export default FoodStatic;
