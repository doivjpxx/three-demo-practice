import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fov, sizes } from '../const/config';
import { handleResize, start, stop } from '../utils/three';
import Card from './Card';

export type CubeProps = {
  geometry: BufferGeometry;
  color: string | number;
};

const Cube = ({ geometry, color }: CubeProps): JSX.Element => {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mount.current) {
      return;
    }
    const width = mount.current.clientWidth;
    const height = mount.current.clientHeight;
    const frameId = Math.floor(Math.random() * 1000);

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
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setSize(sizes.width, sizes.height);

    // init orbit controls
    const controls = new OrbitControls(camera, mount.current);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxDistance = 500;

    // init material
    const material = new THREE.MeshPhongMaterial({
      color,
      flatShading: true
    });

    // init mesh
    const mesh = new THREE.Mesh(geometry, material);
    camera.lookAt(mesh.position);

    // add mesh to scene
    scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener('resize', () =>
      handleResize(width, height, { renderer, camera, scene })
    );

    start(frameId, animate);

    return () => {
      stop(frameId);
      window.removeEventListener('resize', () =>
        handleResize(width, height, { renderer, camera, scene })
      );
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <Card>
      <div ref={mount}></div>
    </Card>
  );
};

export default Cube;
