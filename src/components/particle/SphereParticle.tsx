import { useEffect } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderScene, start, stop } from '../../utils/three';

const SphereParticle = (): JSX.Element => {
  const mount = useRef<HTMLDivElement>(null);

  const createCamera = (width: number, height: number) => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(1, 1, 1);

    return camera;
  };

  const createParticles = () => {
    const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
    const mat = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true
    });
    return {
      geometry: particlesGeometry,
      material: mat
    };
  };

  useEffect(() => {
    if (!mount || !mount.current) {
      return;
    }

    let width = mount.current.parentElement?.clientWidth ?? 700;
    let height = mount.current.parentElement?.clientHeight ?? 700;
    const frameId = Math.floor(Math.random() * 1000);

    // 1. init scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    // 2. init renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // 3. init geo
    const { geometry, material } = createParticles();
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. init camera
    const camera = createCamera(width, height);
    camera.lookAt(particles.position);
    scene.add(camera);

    // 5. init controls
    const controls = new OrbitControls(camera, mount.current);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxDistance = 500;

    controls.update();

    const handleResize = () => {
      if (!mount || !mount.current) {
        return;
      }

      // Update sizes
      width = mount.current.parentElement?.clientWidth ?? 700;
      height = mount.current.parentElement?.clientHeight ?? 700;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderScene(renderer, scene, camera);
    };

    // final. animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    start(frameId, animate);

    // unmount
    return () => {
      stop(frameId);
      scene.remove();
      window.removeEventListener('resize', handleResize);
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} />;
};

export default SphereParticle;
