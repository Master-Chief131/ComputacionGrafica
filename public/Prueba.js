import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "./jsm/loaders/OBJLoader.js";
import { MTLLoader } from "./jsm/loaders/MTLLoader.js";

// standard global variables
let container, scene, camera, renderer, controls;
// const clock = new THREE.Clock();
// custom global variables
// let cube;

init();
animate();

// FUNCTIONS
function init() {
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  const SCREEN_WIDTH = globalThis.innerWidth,
    SCREEN_HEIGHT = globalThis.innerHeight;
  const VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.1,
    FAR = 20000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);
  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById("container");
  container.appendChild(renderer.domElement);
  // CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("textures/bg.jpeg");
  scene.background = texture;

  const mtlLoader = new MTLLoader();
  mtlLoader.load("models/bowser.mtl", (material) => {
    material.preload();
    console.log(material);
    const objLoader = new OBJLoader();
    objLoader.setMaterials(material);
    objLoader.load(
      "models/bowser.obj",
      (object) => {
        scene.add(object);
        //move object to the top
        object.position.y = 70;
        //to the left of the box
        object.position.x = -290;

        object.position.z = -60;
        //make the object bigger
        object.scale.x = 15;
        object.scale.y = 15;
        object.scale.z = 15;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  });

  const mtlLoader2 = new MTLLoader();
  mtlLoader2.load("models/Platform.mtl", (material2) => {
    material2.preload();
    console.log(material2);
    const objLoader2 = new OBJLoader();
    objLoader2.setMaterials(material2);
    objLoader2.load(
      "models/Platform.obj",
      (object2) => {
        scene.add(object2);
        //move object to the top
        object2.position.y = -580;
        //to the left of the box
        object2.position.x = -50;
        //make the object bigger
        object2.scale.x = 25;
        object2.scale.y = 25;
        object2.scale.z = 25;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  });

  //add the piano
  const mtlLoader3 = new MTLLoader();
  mtlLoader3.load("models/piano1.mtl", (material3) => {
    material3.preload();
    console.log(material3);
    const objLoader3 = new OBJLoader();
    objLoader3.setMaterials(material3);
    objLoader3.load(
      "models/piano1.obj",
      (object3) => {
        scene.add(object3);
        //move object to the top
        object3.position.y = 0;
        //to the left of the box
        object3.position.x = -130;
		object3.position.z = -40;
        //make the object bigger
        object3.scale.x = 25;
        object3.scale.y = 25;
        object3.scale.z = 25;
        //rotate the object horizontally
        object3.rotation.y = 3;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  });
 
  /* No funciona aun
  //Agregar la silla
  const mtlLoader4 = new MTLLoader();
  mtlLoader4.load("models/silla.mtl", (material4) => {
	material4.preload();
	console.log(material4);
	const objLoader4 = new OBJLoader();
	objLoader4.setMaterials(material4);
	objLoader4.load(
	  "models/silla.obj",
	  (object4) => {
		scene.add(object4);
		//move object to the top
		object4.position.y = 80;
		//to the left of the box
		object4.position.x = -50;
		object4.position.z = -40;
		//make the object bigger
		object4.scale.x = 25;
		object4.scale.y = 25;
		object4.scale.z = 25;
		//rotate the object horizontally
		object4.rotation.y = 3;
	  },
	  (xhr) => {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	  },
	  (error) => {
		console.log(error);
	  }
	);
	  });
*/


  const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
  const skyBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0x990099,
    side: THREE.BackSide,
  });
  const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);
  scene.fog = new THREE.FogExp2(0x990099, 0.00025);
  

  // LIGHT
  const light = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(light);
  //add a light that illuminates everything evenly
}

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function update() {
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}