// document.getElementById('proyectoBtn').addEventListener('click', function() {
//     window.location.href = 'proyecto.html';
// });
// document.getElementById('pruebaBtn').addEventListener('click', function() {
//     window.location.href = 'prueba.html';
// });

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(2, 0);
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88, wireframe: true });
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();