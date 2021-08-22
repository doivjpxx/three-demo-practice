import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fov, sizes } from '../const/config';
import Card from './Card';

export type CubeProps = {
  id: number | string;
  geometry: any;
  color: string | number;
};

const Cube = ({ id, geometry, color }: CubeProps): JSX.Element => {
  useEffect(() => {
    const canvas = document.getElementById(id.toString());

    if (!canvas) {
      return;
    }

    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(1, 1, 1);

    // init scene
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-1, 0, 4);

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

    // init material
    const material = new THREE.MeshPhongMaterial({
      color,
      flatShading: true,
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
    <Card>
      <canvas id={id.toString()}></canvas>
    </Card>
  );
};

export default Cube;
