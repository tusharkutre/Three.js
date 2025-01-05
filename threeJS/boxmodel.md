import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "purple" } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; //to smooth the camera movement
controls.enableZoom = true; //to disable zoom in and out
controls.enablePan = true; //to disable pan
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //to update the camera aspect ratio when the window is resized
});

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render( scene, camera );
  controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
}

animate();