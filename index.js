import * as THREE from "three"

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const aspect = window.innerWidth / window.innerHeight; // Aspect ratio
const viewSize = 10; // Size of the view in world units

const camera = new THREE.OrthographicCamera(
  -viewSize * aspect / 2, // left
  viewSize * aspect / 2,  // right
  viewSize / 2,           // top
  -viewSize / 2,          // bottom
  0.1,                    // near plane
  1000                    // far plane
);

camera.position.set(0.2, 3.2, 4.1);
camera.rotation.set(THREE.MathUtils.degToRad(-48.294), 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00FF00); // Same as before

// Create a sphere geometry and material
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radius 0.5, 32 segments for smoothness
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

// Create the sphere mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Position the sphere in front of the camera's view
sphere.position.set(0,0,0);
sphere.scale.setScalar(1);

// Add the sphere to the scene
scene.add(sphere);

function animate(t = 0){
    requestAnimationFrame(animate);
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

