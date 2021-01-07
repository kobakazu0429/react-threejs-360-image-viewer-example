import * as THREE from "three";

export class Viewer {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;

  private pos = {
    lon: 0,
    lat: 0,
  };

  constructor(containerId: string, image: "*.png") {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1100
    );

    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);

    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load(image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    this.scene = new THREE.Scene();
    this.scene.add(mesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.appendDom(containerId);
    this.animate();
    this.addResizeEvent();
  }

  public update() {
    this.pos.lon += 0.1;

    this.pos.lat = Math.max(-85, Math.min(85, this.pos.lat));
    const phi = THREE.MathUtils.degToRad(90 - this.pos.lat);
    const theta = THREE.MathUtils.degToRad(this.pos.lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    this.camera.lookAt(x, y, z);

    this.renderer.render(this.scene, this.camera);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.update();
  }

  private appendDom(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.appendChild(this.renderer.domElement);
  }

  private addResizeEvent() {
    window.addEventListener(
      "resize",
      () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );
  }
}
