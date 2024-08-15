//
//  camera.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 12/Aug/2024.
//
import * as THREE from 'three';

export const viewSize = 28;

export function createCamera(){
  const aspect = window.innerWidth / window.innerHeight;

  let camera = new THREE.OrthographicCamera(
    -viewSize * aspect / 2,
    viewSize * aspect / 2,
    viewSize / 2,
    -viewSize / 2,
    0.1,
    1000
  );

  camera.rotation.set(THREE.MathUtils.degToRad(48.294), 0, 0);
  camera.position.set(0.2, -10, 10);
  //To use with the orbit
  //const lookAtPosition = new THREE.Vector3(0, 16, -27);
  //const lookAtPosition = new THREE.Vector3(-24.3, -5, -7);
  //camera.lookAt(lookAtPosition);

  return camera;
}
