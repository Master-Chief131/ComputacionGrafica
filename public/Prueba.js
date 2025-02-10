import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
// import { OBJLoader } from "./jsm/loaders/OBJLoader.js";
// import { MTLLoader } from "./jsm/loaders/MTLLoader.js";
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

// standard global variables
var scene, camera, renderer, parameters;
const vertices = [];
const geometry = new THREE.BufferGeometry();
const materials = [];
const textureLoader = new THREE.TextureLoader();
let particleData;

init();
animate();
// render();

function initScene() {
  scene = new THREE.Scene();
  const backgroundTexture = textureLoader.load("textures/bgpch.png");
  scene.background = backgroundTexture;
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(8, 8, 10);
}

function initRenderer(container) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);
}

function initControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 1;
  controls.maxDistance = 45;
  controls.target.set(0.03, 0.01, -0.01);
  controls.update();
}

function initLights() {
  const light = new THREE.PointLight(0xffffff, 10, 50);
  light.position.set(-20, 20, 20);
  scene.add(light);
}

function initSkybox() {
  const skyTexture = textureLoader.load("textures/fondo_space.jpg");
  const skyBoxGeometry = new THREE.SphereGeometry(50, 50, 50);
  const skyBoxMaterial = new THREE.MeshBasicMaterial({
      map: skyTexture,
      opacity: 0.2,
      side: THREE.BackSide,
      transparent: true,
  });
  const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);
}

function initModel() {
  const loader = new GLTFLoader();
  loader.load('models/escena_completa.glb', function(gltf) {
      scene.add(gltf.scene);
      render();
  });
}

function initParticles() {
  const particleCount = 500;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
      let x = (Math.random() - 0.5) * 50;
      let y = (Math.random() - 0.5) * 50;
      let z = (Math.random() - 0.5) * 50;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = Math.random() * 2 + 1;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleTexture = textureLoader.load('textures/luzdeprueba1.png');
  const material = new THREE.PointsMaterial({
      map: particleTexture,
      size: 1.5,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particles, material);
  scene.add(particleSystem);

  return { particles, velocities, particleSystem };
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}


function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  initScene();
    initCamera();
    initRenderer(container);
    initControls();
    initLights();
    initSkybox();
    initModel();
    particleData = initParticles();

    window.addEventListener('resize', onWindowResize);
}

  // CAMERA
  // camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
  // camera.position.set(8, 8, 10);

  // SCENE
  // scene = new THREE.Scene();

  // Agregar partículas a la escena
  // particleData = createParticles(scene);

  // scene.add(new THREE.AmbientLight(0xFF00FF, 0.5) );

  // BACKGROUND
  // const fondoEspacio = textureLoader.load("textures/fondo_space.jpg");
  // const sprite1 = textureLoader.load( 'textures/luzdeprueba1.png' );
  // const fpeach = textureLoader.load('textures/bgpch.png');
  // scene.background = fpeach;

  // PARTICLES
  

  // SKYBOX
  // const skyBoxGeometry = new THREE.SphereGeometry(50, 50, 50);
  // const skyBoxMaterial = new THREE.MeshBasicMaterial({
  //   map : fondoEspacio,
  //   opacity: 0.2,
  //   side: THREE.BackSide,
  //   transparent: true,
  // });
  // const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  // scene.add(skyBox);
  // const speed = 10; // Velocidad de movimiento del skybox
  // Actualizar la posición del skybox
  // skyBox.position.x += speed;
  // skyBox.position.y += speed;
  // skyBox.position.z += speed;

  // LIGHT
  // var light1, light2, light3;

  // Primera luz: Luz direccional
    // light1 = new THREE.DirectionalLight(0xffffff, 2.5);
    // light1.position.set(20, 20, 20);
    // scene.add(light1);
  
    // Segunda luz: Luz puntual
    // light2 = new THREE.PointLight(0xffffff, 10, 50);
    // light2.position.set(-20, 20, 20);
    // scene.add(light2);
  
    // Tercera luz: Luz puntual
    // light3 = new THREE.PointLight(0x990099, 100, 100);
    // light3.position.set(20, -20, -20);
    // scene.add(light3);

  // const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.5);
  // dirLight.position.set(15, 20, 15);
  // dirLight.castShadow = true;
  // dirLight.shadow.camera.right = 2;
  // dirLight.shadow.camera.left = -2;
  // dirLight.shadow.camera.top = 2;
  // dirLight.shadow.camera.bottom = -2;
  // dirLight.shadow.mapSize.width = 1024;
  // dirLight.shadow.mapSize.height = 1024;
  // scene.add(dirLight);

  // MODEL
  // const loader = new GLTFLoader();
  // loader.load('models/escena_completa.glb', function(gltf) {
  //   scene.add(gltf.scene);
  //   render();
  // } );

  // RENDERER
  // renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.toneMapping = THREE.ACESFilmicToneMapping
  // renderer.toneMappingExposure = 1
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // container.appendChild(renderer.domElement);

  // CONTROLS
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.addEventListener('change', render);
  // controls.minDistance = 1;
  // controls.maxDistance = 45;
  // controls.target.set(0.03, 0.01, -0.01);
  // controls.update();
  // window.addEventListener('resize', onWindowResize);
// }

function animate() {
  requestAnimationFrame(animate);

  const positions = particleData.particles.attributes.position.array;
  const velocities = particleData.velocities;

  for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      if (positions[i] > 25 || positions[i] < -25) velocities[i] *= -1;
      if (positions[i + 1] > 25 || positions[i + 1] < -25) velocities[i + 1] *= -1;
      if (positions[i + 2] > 25 || positions[i + 2] < -25) velocities[i + 2] *= -1;
  }

  particleData.particles.attributes.position.needsUpdate = true;
  
  render();
}


function render() {
  renderer.render(scene, camera);
}