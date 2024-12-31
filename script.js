// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f4f4);

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio 1:1 cho ô vuông
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500); // Kích thước khớp với viewer-box
document.getElementById('viewer-box').appendChild(renderer.domElement);

// Light setup
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// OrbitControls setup
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = true;

// Load STL model
const loader = new THREE.STLLoader();
loader.load(
    './test.stl',
    function (geometry) {
        const material = new THREE.MeshStandardMaterial({ color: 0x0077be });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; // Rotate to face upward
        mesh.scale.set(0.1, 0.1, 0.1); // Scale down if the model is too big
        scene.add(mesh);
    },
    undefined,
    function (error) {
        console.error('Error loading STL file:', error);
    }
);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize handler (optional if you resize container)
window.addEventListener('resize', () => {
    const container = document.getElementById('viewer-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
