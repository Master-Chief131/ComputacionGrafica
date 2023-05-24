import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';

// standard global variables
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	// RENDERER
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// CONTROLS
	controls = new OrbitControls( camera, renderer.domElement );
	

	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load('textures/bg.jpeg');
	scene.background = texture;

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
	  //move object to the top
	  object.position.y = 50;
	  //to the left of the box
	  object.position.x = -50;
	  //make the object bigger
	  object.scale.x = 10;
	  object.scale.y = 10;
	  object.scale.z = 10;
    },
    (xhr) => {
      console.log(xhr.loaded / xhr.total * 100 + '% loaded');
    },
    (error) => {
      console.log(error);
    }
  );
});


	const skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	const skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	const skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x990099, 0.00025 );
	
    // LIGHT
	var light = new THREE.PointLight(0xffffff, 3.5);
	light.position.set(0,250,0);
	scene.add(light);

	var extrudeSettings = {
  depth: 2, // Profundidad de la extrusión
  bevelEnabled: false // Desactivar el biselado de los bordes
};

    var floorMaterial = new THREE.MeshLambertMaterial({color: 0xFF4589, side: THREE.DoubleSide})
    const floorGeometry = new THREE.ExtrudeGeometry( 550, 64 ); 
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	controls.update();
}

function render() 
{
	renderer.render( scene, camera );
}
