import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const aspect = window.innerWidth / window.innerHeight;
const viewSize = 28;

const camera = new THREE.OrthographicCamera(
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
//camera.lookAt(lookAtPosition);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const light = new THREE.DirectionalLight(0xFFF4D6, 5);
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

const textureLoader = new THREE.TextureLoader();
// Load the textures
const textures = {
    'Floor_Concrete_250mm_1597466': textureLoader.load('models/fbx/image.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0); // Offset
    }),
    'Basic_Wall_M_Exterior_-_Brick_on_CMU_1601104': textureLoader.load('models/fbx/image3.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.2, 0.2); // Tile 2x2
        texture.offset.set(0, 0); // Offset by 0.1 in both directions
    }),
    'Basic_Wall_M_Exterior_-_Brick_on_CMU_1601155': textureLoader.load('models/fbx/image3.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.2, 0.2); // Tile
        texture.offset.set(0, 0); // Offset
    }),
    'Basic_Wall_M_Exterior_-_Brick_on_CMU_1601206': textureLoader.load('models/fbx/image3.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.2, 0.2); // Tile
        texture.offset.set(0, 0); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1594998': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),

    'Table-Rectangular_72"_x_30"_1597829': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600210': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600224': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600227': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600230': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600233': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600236': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600239': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600298': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1594998': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600321': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600323': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600325': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600406': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600408': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600410': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600412': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600414': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600416': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600418': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600465': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600528': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600404': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    'Table-Rectangular_72"_x_30"_1600311': textureLoader.load('models/fbx/image1.png', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1); // Tile
        texture.offset.set(0, 0.1); // Offset
    }),
    // Add more as needed
};

const colors = {
    'Floor_Concrete_250mm_1597466': 0xddc8cf,
    'Basic_Wall_M_Exterior_-_Brick_on_CMU_1601104': 0xFFEDED,
    'Basic_Wall_M_Exterior_-_Brick_on_CMU_1601155': 0xFFEDED,
    'Basic_Wall_M_Exterior_-_Brick_on_CMU_1601206': 0xFFEDED,
    'Table-Rectangular_72"_x_30"_1594998': 0xB55433,
    'Table-Rectangular_72"_x_30"_1597829': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600210': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600224': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600227': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600230': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600233': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600236': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600239': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600298': 0xB55433,
    'Table-Rectangular_72"_x_30"_1594998': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600321': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600323': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600325': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600406': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600408': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600410': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600412': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600414': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600416': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600418': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600465': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600528': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600404': 0xB55433,
    'Table-Rectangular_72"_x_30"_1600311': 0xB55433,
    // Add more as needed
};

const materialMap = {
    'M_Trim-Window-Exterior-Flat_with_Sill_1601317': new THREE.MeshLambertMaterial({ color: 0x878787 }),
    'M_Trim-Window-Exterior-Flat_with_Sill_1601438': new THREE.MeshLambertMaterial({ color: 0x878787 }),
    'M_Trim-Window-Exterior-Flat_with_Sill_1601525': new THREE.MeshLambertMaterial({ color: 0x878787 }),
    'M_Trim-Window-Exterior-Flat_with_Sill_1601572': new THREE.MeshLambertMaterial({ color: 0x878787 }),
    'M_Trim-Window-Exterior-Flat_with_Sill_1601631': new THREE.MeshLambertMaterial({ color: 0x878787 }),
    'M_Window-Fixed_750_x_1650mm_2_1601521': new THREE.MeshLambertMaterial({ color: 0x08D1F8 }),
    'M_Window-Fixed_750_x_1650mm_1601313': new THREE.MeshLambertMaterial({ color: 0x08D1F8 }),
    'M_Window-Fixed_750_x_1650mm_1601434': new THREE.MeshLambertMaterial({ color: 0x08D1F8 }),
    'M_Window-Fixed_750_x_1650mm_1601568': new THREE.MeshLambertMaterial({ color: 0x08D1F8 }),
    'M_Window-Fixed_750_x_1650mm_1601627': new THREE.MeshLambertMaterial({ color: 0x08D1F8 }),
    // Add more as needed
};


const loader = new FBXLoader();
loader.load('models/fbx/environment.fbx', (object) => {
    object.traverse((child) => {
        if (child.isMesh) {
            if (textures[child.name]) {
                if(colors[child.name]){
                    child.material = new THREE.MeshLambertMaterial({ map: textures[child.name], color: colors[child.name] });
                } else {
                    child.material = new THREE.MeshLambertMaterial({ map: textures[child.name]});
                }
                child.castShadow = true; // Enable shadow casting
                child.receiveShadow = true; // Enable receiving shadows
            } else if (materialMap[child.name]) {
                child.material = materialMap[child.name];
                child.castShadow = true; // Enable shadow casting
                child.receiveShadow = true; // Enable receiving shadows
            } else
            {
                child.material = new THREE.MeshLambertMaterial({
                    color: 0x808080,  // Grey color
                    transparent: true, // Enable transparency
                    opacity: 0       // Set the opacity (0.0 is fully transparent, 1.0 is fully opaque)
                });
            }
            
        }
    });

    // Set Rotation
    object.rotation.set(0, 0, THREE.MathUtils.degToRad(-90)); // Y-axis rotation of -90 degrees
    // Set Position
    object.position.set(-22.5, -25, -10);//z axis is up

    scene.add(object);
}, undefined, (error) => {
    console.error('An error happened:', error);
});

// Uncoment for orbit
//const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    //Uncoment for orbit
    //controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -viewSize * aspect / 2;
    camera.right = viewSize * aspect / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();
});
