import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/FBXLoader.js';

class Character {
    #fileName;
    #mixer;
    #x;
    #y;

    constructor(scene, fileName, x, y) {
        this.#fileName = fileName;
        this.#mixer = null;
        this.#x = x;
        this.#y = y;

        this.#createCharacter(scene, fileName, x, y)
    }

    #createCharacter(scene, fileName, x, y) {
        const loader = new FBXLoader();
        loader.load('models/fbx/' + fileName + '.fbx', (object) => {
    
            this.#mixer = new THREE.AnimationMixer(object);
    
            object.traverse((child) => {
                child.castShadow = true; // Enable shadow casting
                child.receiveShadow = true; // Enable receiving shadows
            });
    
            const anim = new FBXLoader();
            anim.load('models/fbx/Idle.fbx', (anim) => {
                const idle = this.#mixer.clipAction(anim.animations[0]);
                idle.play();
            });
    
            // Set Rotation
            object.rotation.set(THREE.MathUtils.degToRad(90), 0, 0); // X-axis rotation of -90 degrees
            // Set Position
            object.position.set(x, y, -10);//z axis is up
            object.scale.setScalar(0.025);
           
            scene.add(object);
        });
    }

    getMixer(){
        return this.#mixer;
    }
}

export default Character;


