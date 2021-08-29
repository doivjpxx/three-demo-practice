import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fov, sizes } from '../const/config';
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
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId = 0;

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

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!mount || !mount.current) {
        return;
      }
      width = mount.current.clientWidth;
      height = mount.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderScene();
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);

    start();

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
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
