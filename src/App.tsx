import { useEffect } from 'react';
import * as THREE from 'three';
import './App.css';
// import Box from './Box';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App(): JSX.Element {
  useEffect(() => {
    // console.log(document.getElementById('canvas'));
    const canvas = document.getElementById('canvas')!;

    const fov = 75;
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 5;

    // init scene
    const scene = new THREE.Scene();

    // init renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setSize(sizes.width, sizes.height);
    // document.body.appendChild(renderer.domElement);

    // init orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.maxDistance = 500;

    // init geometry
    const geometry = new THREE.BoxGeometry();

    // init material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // init mesh
    const mesh = new THREE.Mesh(geometry, material);

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
