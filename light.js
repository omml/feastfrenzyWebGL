//
//  lights.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 12/Aug/2024.
//
import * as THREE from 'three';

export function createLight(scene){
    let light = new THREE.DirectionalLight(0xFFF4D6, 5);
    light.position.set(0, 0, 15);
    light.castShadow = true;
    light.shadow.camera.left = -32;
    light.shadow.camera.right = 32;
    light.shadow.camera.top = 30;
    light.shadow.camera.bottom = -20;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 70;
    scene.add(light);

    //Uncomment for shadow helper
    //const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
    //scene.add(shadowHelper);

    return light;
}
