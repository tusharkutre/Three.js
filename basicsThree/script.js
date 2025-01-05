// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// Create a gradient texture
const createGradientTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext('2d');

    // Create a gradient
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'lightblue');    // Start color
    gradient.addColorStop(1, 'blue');   // End color

    // Fill the canvas with the gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
};

// Create a cube with the gradient texture
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const gradientTexture = createGradientTexture();
const cubeMaterial = new THREE.MeshPhongMaterial({ map: gradientTexture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Add the cube to the scene
scene.add(cube);

// Add lighting (required for MeshPhongMaterial)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Create a renderer
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Render loop
function animate() {
    window.requestAnimationFrame(animate);

    // Rotate the cube continuously
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

animate();