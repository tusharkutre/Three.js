Three.js is a JavaScript library for 3D graphics.
It is used to create 3D graphics in the browser using WebGL.
It is a library that is used to create 3D graphics in the browser using WebGL.

Three.js and WebGL both are different.

Three.js is a library that is used to create 3D graphics in the browser using WebGL.
WebGL is a JavaScript API for rendering 3D graphics in the browser.

Three.js is a library that is used to create 3D graphics in the browser using WebGL.
WebGL is a JavaScript API for rendering 3D graphics in the browser.
-------------------------------------------------------------------
// cube.position.z = -3; // this is the z axis(left and right)

cube.rotation.x = Math.PI / 4; //180 degrees in radians
cube.rotation.y = Math.PI / 4;

---------------------------------------
    const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.render(scene, camera);
function animate() {
    window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
animate();

