import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
	
	var cubeGeometry = new THREE.BoxGeometry( 50, 50, 50 );
	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xc027c4} );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,50,0);
	scene.add(cube);

	const skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	const skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.BackSide } );
	const skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x181717, 0.00025 );
	
    // LIGHT
	var light1 = new THREE.SpotLight(0x0D1F75);
	light1.position.set(-50,150,0);
	scene.add(light1);

    var light2 = new THREE.SpotLight(0xffff00 );
	light2.position.set(50,250,0);
	scene.add(light2);
	
    var light3 = new THREE.SpotLight(0x58C428);
	light3.position.set(75,50,0);
	scene.add(light3);
	
	light1.shadow.mapSize.width= 512;
	light1.shadow.mapSize.height=512;
	light1.shadow.camera.near= 0.5;
	light1.shadow.camera.far = 500;
	light1.shadow.focus = 1;

	
	
    var floorMaterial = new THREE.MeshLambertMaterial({color: 0xFF4589, side: THREE.DoubleSide})
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
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
