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

    // TEXTURA
    const textura01 = new THREE.TextureLoader().load('textures/bloque2.png' );
 
    const textura02 = new THREE.TextureLoader().load('textures/floor.jpg', function(textura02){
        textura02.wrapS = textura02.wrapT = THREE.RepeatWrapping;
        textura02.offset.set( 0, 0 );
        textura02.repeat.set(10, 10 );
    })

    const textura03 = new THREE.TextureLoader().load('textures/ladrillo.jpg' );
	
	var cubeGeometry = new THREE.BoxGeometry( 125, 125, 125 );
	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xd4f71b,  map: textura01, side: THREE.DoubleSide } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,70,0);
	scene.add(cube);

    var cubeGeometry2 = new THREE.BoxGeometry( 125, 125, 125 );
    var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xd4f71b, map:textura03, side: THREE.DoubleSide } );
    var cube2 = new THREE.Mesh( cubeGeometry2, cubeMaterial2 );
    cube2.position.set(0,70,170);
    scene.add(cube2);
	
    
    
    const skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	const skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	const skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0xE2E4D5, 0.00025 );
	
    // LIGHT
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambientLight );

const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight1.position.set( 1, 1, 1 );
scene.add( directionalLight1 );

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight2.position.set( -1, -1, -1 );
scene.add( directionalLight2 );

    var floorMaterial = new THREE.MeshLambertMaterial({color: 0xff4589, map: textura02, side: THREE.DoubleSide})
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
