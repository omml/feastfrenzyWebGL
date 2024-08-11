import * as THREE from 'three';

export function createRenderer(){
    const w = window.innerWidth;
    const h = window.innerHeight;
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    return renderer;
}
