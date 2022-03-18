import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';

let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webGL');
canvas.height 

scene = new THREE.Scene();

const fov = 60; // field of view
const aspect = window.innerWidth / window.innerHeight; // aspect ratio of screen
/* 
If the distance between the object being viewed and the camera is less than 0.1, it will not be visible. Same applies if distance > 1000 
*/
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0)

// Control orbit of earth
const controls = new OrbitControls(camera, renderer.domElement);

// Creating dimensions & properties of earth per THREE.js materials documentation
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('textureImages/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('textureImages/earthbump.jpg'),
    bumpScale: 0.1
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);
const cloudGeometry = new THREE.SphereGeometry(0.61, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('textureImages/earthCloud.png'),
    transparent: true
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// Creating background galaxy
const starGeometry = new THREE.SphereGeometry(80, 64, 64);
const starMaterial = new THREE.MeshBasicMaterial({ // MeshBasicMaterial does not interact w/ light
    map: THREE.ImageUtils.loadTexture('textureImages/galaxy.png'),
    side: THREE.BackSide
});
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// Creating light source to view the object
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5); // x y and z position of light source
scene.add(pointLight);

// animation loop
const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.002;
    cloudMesh.rotation.y -= 0.001;
    starMesh.rotation.y -= 0.0005;
    controls.update();
    render();
}
const render = () => {
    renderer.render(scene, camera);
}

window.onresize = function() { location.reload(); } // Refresh page on window resize

animate();



