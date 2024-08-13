import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/MTLLoader.js';
//import { Direction } from './commonDefinitions.js';

class Food {
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

    reuse(scene, x, y, z, yRot = 0, delay = 100) {
        const retryIfNeeded = () => {
            if (this._model) {
                const newObj = this._model.clone();
                newObj.position.set(x, y, z);
                newObj.rotation.set(THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(yRot), 0); // X-axis rotation of 90 degrees
                scene.add(newObj);
                return newObj;
            } else {
                console.warn('Model not loaded yet, retrying...');
                setTimeout(retryIfNeeded, delay);
            }
        };
    
        return retryIfNeeded();
    }
}

export default Food;
