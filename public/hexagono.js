import * as THREE from 'three';



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var radius = 2;
var sides = 6;

var vertices = [];
for (var i = 0; i < sides; i++) {
  var angle = (Math.PI / 3) * i;
  var x = Math.cos(angle) * radius;
  var y = Math.sin(angle) * radius;
  vertices.push(new THREE.Vector3(x, y, 0));
}

var geometry = new THREE.Geometry();
geometry.vertices = vertices;
geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faces.push(new THREE.Face3(0, 2, 3));
geometry.faces.push(new THREE.Face3(0, 3, 4));
geometry.faces.push(new THREE.Face3(0, 4, 5));
geometry.faces.push(new THREE.Face3(0, 5, 6));
geometry.faces.push(new THREE.Face3(0, 6, 1));
geometry.computeFaceNormals();

var hexagon = new THREE.Mesh(geometry, material);
scene.add(hexagon);

function animate() {
  requestAnimationFrame(animate);
  hexagon.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
