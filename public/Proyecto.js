import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { CubeTextureLoader } from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

// Create and set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the controls
const controls = new OrbitControls(camera, renderer.domElement);

// Load the materials and objects
const mtlLoader = new MTLLoader();
mtlLoader.load('models/bowser.mtl', (material) => {
  material.preload();
  console.log(material);
  const objLoader = new OBJLoader();
  objLoader.setMaterials(material);
  objLoader.load(
    'models/bowser.obj',
    (object) => {
      scene.add(object);
    },
    (xhr) => {
      console.log(xhr.loaded / xhr.total * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );
});


const mtlLoader2 = new MTLLoader();
mtlLoader2.load('models/piano.mtl', (material2) => {
  material2.preload();
  console.log(material2);
  const objLoader = new OBJLoader();
  objLoader.setMaterials(material2);
  objLoader.load(
    'models/piano.obj',
    (object2) => {
      // Move object to the left
      object2.position.x = -15;
      scene.add(object2);
    },
    (xhr) => {
      console.log(xhr.loaded / xhr.total * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );
});

// Set up the skybox
const skyBoxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000);
	const skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xC54B8C, side: THREE.BackSide } );
	const skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);


// Add lights
const light = new THREE.AmbientLight(0xffffff, 0.45); // Soft white light
scene.add(light);

// Set up the window resize event
window.addEventListener(
  'resize',
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  },
  false
);

// Create the animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

// Render the scene
function render() {
  renderer.render(scene, camera);
}

// Start the animation
animate();
