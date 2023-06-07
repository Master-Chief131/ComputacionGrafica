import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from "./jsm/loaders/OBJLoader.js";
import { FBXLoader } from "./jsm/loaders/FBXLoader.js";
import { MTLLoader } from "./jsm/loaders/MTLLoader.js";
import Stats from "three/addons/libs/stats.module.js";

// standard global variables
var container, scene, camera, renderer, controls, stats, parameters;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
const materials = [];

var clock = new THREE.Clock();
// custom global variabless
var cube;

init();
animate();

// FUNCTIONS
function init() {
  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.1,
    FAR = 20000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  // RENDERER
  renderer = new THREE.WebGLRenderer({
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixcelRatio);
  renderer.shadowMap.enabled = true;
  renderer.capabilities.logarithmicDepthBuffer = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  renderer.toneMappingExposure = Math.pow(0.9, 4.0);
  renderer.toneMappingExposure = THREE.ReinhardToneMapping;
  document.body.appendChild(renderer.domElement);

  container = document.getElementById("container");
  container.appendChild(renderer.domElement);

  // renderer = new THREE.WebGLRenderer();
  // renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setSize( window.innerWidth, window.innerHeight);
  // document.body.appendChild( renderer.domElement);
  stats = new Stats();
  document.body.appendChild(stats.dom);

  document.body.style.touchAction = "none";
  document.body.addEventListener("pointermove", onPointerMove);
  window.addEventListener("resize", onWindowResize);

  // CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const fondoEspacio = textureLoader.load("textures/fondo_space.jpg");
  const sprite1 = textureLoader.load("textures/luzdeprueba1.png");
  const fpeach = textureLoader.load("textures/bgpch.png");
  scene.background = fpeach;

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
        //rotate the object horizontally
        object.rotation.y = -0.12;
        //move object to the top
        object.position.y = 115;
        //to the left of the box
        object.position.x = -405;

        object.position.z = -90;
        //make the object bigger
        object.scale.x = 23;
        object.scale.y = 23;
        object.scale.z = 23;
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
        object3.scale.x = 50;
        object3.scale.y = 50;
        object3.scale.z = 50;
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
        object4.position.y = 20;
        //to the left of the box
        object4.position.x = -535;
        object4.position.z = -90;
        //make the object bigger
        object4.scale.x = 55;
        object4.scale.y = 35;
        object4.scale.z = 55;
        object4.rotation.y = Math.PI / 2; // Rotación en el eje y
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  });

  const fbxLoader = new FBXLoader();
  fbxLoader.load(
    "models/Star.fbx",
    (object5) => {
      scene.add(object5);
      // Ajusta la posición, escala y rotación del modelo según tus necesidades
      //move object to the top
      object5.position.y = 230;
      //to the left of the box
      object5.position.x = -130;
      object5.position.z = -40;
      //make the object bigger
      object5.scale.x = 0.35;
      object5.scale.y = 0.35;
      object5.scale.z = 0.35;
      animateRotation(object5, "y", 0.01);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("An error occurred while loading the FBX file:", error);
    }
  );

  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    vertices.push(x, y, z);
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  parameters = [
    // [[0.8, 1, 0.5 ], sprite1, 20 ],
    // [[0.8, 1, 0.5 ], sprite1, 15 ],
    [[0.8, 1, 0.5], sprite1, 20],
    // [[0.8, 1, 0.5 ], sprite1, 8 ],
    // [[0.8, 1, 0.5 ], sprite1, 5 ],
  ];

  for (let i = 0; i < parameters.length; i++) {
    const color = parameters[i][0];
    const sprite = parameters[i][1];
    const size = parameters[i][2];
    materials[i] = new THREE.PointsMaterial({
      size: size,
      map: sprite,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });
    materials[i].color.setHSL(color[0], color[1], color[2]);
    const particles = new THREE.Points(geometry, materials[i]);
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;
    scene.add(particles);
  }

  const skyBoxGeometry = new THREE.SphereGeometry(3000, 1000, 1000);
  const skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: fondoEspacio,
    opacity: 0.3,
    side: THREE.BackSide,
    transparent: true,
  });
  const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);
  const speed = 0.01; // Velocidad de movimiento del skybox

  // Actualizar la posición del skybox
  skyBox.position.x += speed;
  skyBox.position.y += speed;
  skyBox.position.z += speed;
  // scene.fog = new THREE.FogExp2(0x990099, 0.00025);

  // LIGHT
  var light1, light2, light3;

  // Primera luz: Luz direccional
  light1 = new THREE.DirectionalLight(0xffffff, 2.5);
  light1.position.set(1, 1, 1);
  scene.add(light1);

  // Segunda luz: Luz puntual
  light2 = new THREE.PointLight(0x990085, 10000000, 1000);
  light2.position.set(-200, 200, 200);
  scene.add(light2);

  // Tercera luz: Luz puntual
  light3 = new THREE.PointLight(0x990099, 10000000, 1000);
  light3.position.set(200, -200, -200);
  scene.add(light3);
}
const renderScene = new RenderPass(scene, camera);

const bloomPass = new BloomPass(
  /* strength */ 100, /* kernelSize */ 2500, /* sigma */ 4, /* resolutionScale */ 256
);

const copyPass = new ShaderPass(CopyShader);
copyPass.renderToScreen = true;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(copyPass);

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

// ...

function animateRotation(object, axis, speed) {
  function animate() {
    requestAnimationFrame(animate);
    object.rotation[axis] += speed;
    renderer.render(scene, camera);
  }
  animate();
}

function animate() {
  setTimeout(function () {
    requestAnimationFrame(animate);
    render();
    stats.update();
    update();
  }, 16.67);
}

function update() {
  controls.update();
}

function render() {
  composer.render();
  light1.position.copy(camera.position);
  const time = Date.now() * 0.00005;

  for (let i = 0; i < scene.children.length; i++) {
    const object = scene.children[i];
    if (object instanceof THREE.Points) {
      object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
    }
  }

  renderer.render(scene, camera);
}
