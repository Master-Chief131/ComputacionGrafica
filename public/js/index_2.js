import * as THREE from 'three';

let scene, camera, renderer;
let cards = [];

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luz
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Crear Tarjetas
    createCard("Proyecto 1", "https://lh3.googleusercontent.com/d/1OYcbEmf67yPGTlPHXScAmO5JvG4gCfVM", -2, "proyecto.html");
    createCard("Proyecto 2", "preview2.jpg", 2, "prueba.html");

    // Manejo del Mouse
    document.addEventListener("mousemove", onMouseMove);
}

function createCard(title, image, x, url) {
    const geometry = new THREE.PlaneGeometry(2, 3);
    const texture = new THREE.TextureLoader().load(image);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const card = new THREE.Mesh(geometry, material);
    card.position.set(x, 0, 0);
    card.userData = { url };

    // scene.add(card);
    cards.push(card);

    // Crear div HTML sobre la tarjeta
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = title;
    cardDiv.style.top = `${window.innerHeight / 2 - 100}px`;
    cardDiv.style.left = `${(x + 2) * 150}px`;
    
    document.body.appendChild(cardDiv);

    cardDiv.addEventListener("click", () => {
        window.location.href = url;
    });
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    cards.forEach(card => {
        card.rotation.y = mouseX * 0.2;
        card.rotation.x = mouseY * 0.2;
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Detectar Click en Tarjetas 3D
window.addEventListener("click", (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cards);

    if (intersects.length > 0) {
        window.location.href = intersects[0].object.userData.url;
    }
});
