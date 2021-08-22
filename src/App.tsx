import { useEffect } from 'react';
import * as THREE from 'three';
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App(): JSX.Element {
  useEffect(() => {
    const canvas = document.getElementById('canvas');

    if (!canvas) {
      return;
    }

    const fov = 75;
    const sizes = {
      width: 300,
      height: 300
    };

    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 2;

    // init scene
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = -1;
    pointLight.position.y = 0;
    pointLight.position.z = 4;

    // this will add light follow to the camera
    camera.add(ambientLight, pointLight);
    scene.add(camera);

    // init renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setSize(sizes.width, sizes.height);

    // init orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxDistance = 500;

    // init geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);

    // init material
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00
    });

    // init mesh
    const mesh = new THREE.Mesh(geometry, material);
    camera.lookAt(mesh.position);

    // add mesh to scene
    scene.add(mesh);

    // final step
    // render the cube

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <canvas id="canvas"></canvas>
      </header>
    </div>
  );
}

export default App;
