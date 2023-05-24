import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'

var camera, scene, renderer, controls;
var earth, earth_container, lookAtPos;

init();
animate();

function init(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(25,1,0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    
    var light = new THREE.PointLight(0xffffff);
    scene.add(light);
    var ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    var gridGeom = new THREE.PlaneGeometry(22,22,22,22);
    gridGeom.rotateX(THREE.MathUtils.degToRad(-90));
    var gridMat = new THREE.MeshBasicMaterial({color: 0x555555, wireframe: true});
    var grid = new THREE.Mesh(gridGeom, gridMat);
    scene.add(grid);

    var sunGeom = new THREE.SphereGeometry(2, 16, 8);
    var sunMat = new THREE.MeshBasicMaterial({color: "gold"});
    var sun = new THREE.Mesh(sunGeom, sunMat);
    scene.add(sun);

    const points = [];
    points.push(new THREE.Vector3(-10,0,0));
    points.push(new THREE.Vector3(0,10,0));
    points.push(new THREE.Vector3(10,0,0));

    var earthGeom = new THREE.SphereGeometry(1, 16, 8);
    var texture = new THREE.TextureLoader().load('https://threejsfundamentals.org/threejs/resources/images/earth.jpg');
    var earthMat = new THREE.MeshBasicMaterial({map: texture, transparent: true, opacity: 0.95}); 
    earth = new THREE.Mesh(earthGeom, earthMat); 

    var edges = new THREE.EdgesGeometry(earthGeom);
    var lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: "purple"}));
    earth.add(lines);

    const axisGeomPoints = [];
    axisGeomPoints.push(new THREE.Vector3(0,1.5,0));
    axisGeomPoints.push(new THREE.Vector3(0,1.5,0));
    var axisGeom = new THREE.BufferGeometry().setFromPoints(axisGeomPoints)
    var axis = new THREE.Line(axisGeom, new THREE.LineBasicMaterial({color: "yellow"}));
    earth.add(axis);

    scene.add(earth);

    var earth_holder = new THREE.Group();
    earth_holder.rotation.x = THREE.MathUtils.degToRad(-23);
    earth_holder.add(earth);

    earth_container = new THREE.Group();
    earth_container.add(earth_holder);
    scene.add(earth_container);
}

function animate() {
    var time = new Date() * 0.00025;
    requestAnimationFrame(animate);
    earth.rotation.y +=0.025;
    earth_container.position.x = -Math.cos(time) * 10;
    earth_container.position.z = -Math.sin(time) * 10;0
    lookAtPos = earth_container.position.clone().add(new THREE.Vector3(0,0,1));
    earth_container.lookAt(lookAtPos);

    render();
}

function render(){
    renderer.render(scene, camera);
}
