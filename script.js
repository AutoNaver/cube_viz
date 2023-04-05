// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Create the cube
const geometry = new THREE.BoxGeometry();
const materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000 }),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    new THREE.MeshStandardMaterial({ color: 0xffff00 }),
    new THREE.MeshStandardMaterial({ color: 0xff00ff }),
    new THREE.MeshStandardMaterial({ color: 0x00ffff }),
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Set up a light source
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 5;

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle the dropdown menu
const dropdown = document.getElementById('sides');
dropdown.addEventListener('change', (event) => {
    const selectedSide = parseInt(event.target.value);
    if (!isNaN(selectedSide)) {
        rotateToSide(selectedSide);
    }
});

// Create a quaternion to store rotation targets
const targetQuaternion = new THREE.Quaternion();

// Rotate the cube to the chosen side
function rotateToSide(sideIndex) {
    const targetNormal = new THREE.Vector3();
    switch (sideIndex) {
        case 0:
            targetNormal.set(1, 0, 0);
            break;
        case 1:
            targetNormal.set(-1, 0, 0);
            break;
        case 2:
            targetNormal.set(0, 1, 0);
            break;
        case 3:
            targetNormal.set(0, -1, 0);
            break;
        case 4:
            targetNormal.set(0, 0, 1);
            break;
        case 5:
            targetNormal.set(0, 0, -1);
            break;
    }

    const rotationAxis = new THREE.Vector3().crossVectors(cube.getWorldDirection(), targetNormal).normalize();
    const angle = cube.getWorldDirection().angleTo(targetNormal);
    targetQuaternion.copy(cube.quaternion).multiply(new THREE.Quaternion().setFromAxisAngle(rotationAxis, angle));
    cubeRotationInProgress = true;
}

let cubeRotationInProgress = false;
const rotationLerpFactor = 0.1;

function animate() {
    requestAnimationFrame(animate);

    if (cubeRotationInProgress) {
        cube.quaternion.slerp(targetQuaternion, rotationLerpFactor);

        if (cube.quaternion.angleTo(targetQuaternion) < 0.01) {
            cube.quaternion.copy(targetQuaternion);
            cubeRotationInProgress = false;
        }
    }

    renderer.render(scene, camera);
}

animate();
