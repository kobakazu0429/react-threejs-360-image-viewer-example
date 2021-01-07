import * as THREE from "three";
import room from "../assets/360image/room.jpg";

let camera: any;
let scene: any;
let renderer: any;

let isUserInteracting = false;
let onPointerDownMouseX = 0;
let onPointerDownMouseY = 0;
let lon = 0;
let onPointerDownLon = 0;
let lat = 0;
let onPointerDownLat = 0;
let phi = 0;
let theta = 0;

window.addEventListener("load", () => {
  init();
  animate();
});

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );

  scene = new THREE.Scene();

  const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  const texture = new THREE.TextureLoader().load(room);
  console.log(texture);

  const material = new THREE.MeshBasicMaterial({ map: texture });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.getElementById("container");
  console.log(container);
  if (!container) return;

  container.appendChild(renderer.domElement);

  container.style.touchAction = "none";
  container.addEventListener("pointerdown", onPointerDown, false);

  document.addEventListener("wheel", onDocumentMouseWheel, false);

  //

  document.addEventListener(
    "dragover",
    function (event) {
      event.preventDefault();
      event.dataTransfer!.dropEffect = "copy";
    },
    false
  );

  document.addEventListener(
    "dragenter",
    function () {
      document.body.style.opacity = "0.5";
    },
    false
  );

  document.addEventListener(
    "dragleave",
    function () {
      document.body.style.opacity = "1";
    },
    false
  );

  document.addEventListener(
    "drop",
    function (event) {
      event.preventDefault();

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function (event) {
          material.map!.image.src = event.target!.result;
          material.map!.needsUpdate = true;
        },
        false
      );
      reader.readAsDataURL(event.dataTransfer!.files[0]);

      document.body.style.opacity = "1";
    },
    false
  );

  //

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event: any) {
  if (event.isPrimary === false) return;

  isUserInteracting = true;

  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener("pointermove", onPointerMove, false);
  document.addEventListener("pointerup", onPointerUp, false);
}

function onPointerMove(event: any) {
  if (event.isPrimary === false) return;

  lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
  lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
}

function onPointerUp(event: any) {
  if (event.isPrimary === false) return;

  isUserInteracting = false;

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

function onDocumentMouseWheel(event: any) {
  const fov = camera.fov + event.deltaY * 0.05;

  camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

function update() {
  if (isUserInteracting === false) {
    lon += 0.1;
  }

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  const x = 500 * Math.sin(phi) * Math.cos(theta);
  const y = 500 * Math.cos(phi);
  const z = 500 * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(x, y, z);

  renderer.render(scene, camera);
}
