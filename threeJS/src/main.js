import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'), // Ensure you have a canvas element with id="canvas" in your HTML
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // Fallback for devicePixelRatio
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Camera position
camera.position.set(0, 0, 5);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// HDRI Environment
new RGBELoader()
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/empty_play_room_1k.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        // scene.background = texture; // Optionally set the background as well
    }, undefined, function(error) {
        console.error('An error occurred while loading the HDRI:', error);
    });

    const loader = new GLTFLoader();
    loader.load('./earth.glb', function(gltf) {
        scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error('An error occurred while loading the GLTF:', error);
    });

// Add a test mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: "purple"
});
// const box = new THREE.Mesh(geometry, material);
// scene.add(box);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();