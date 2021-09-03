import { useEffect } from 'react';
import { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderScene, start, stop } from '../../utils/three';

const StarParticle = (): JSX.Element => {
  const mount = useRef<HTMLDivElement>(null);

  const createCamera = (width: number, height: number) => {
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(1, 1, 1);

    return camera;
  };

  const createParticles = () => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/textures/particles/8.png');

    const geo = new THREE.BufferGeometry();
    const count = 500;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      alphaMap: texture,
      transparent: true,
      depthWrite: false,
      vertexColors: true
    });

    return {
      geometry: geo,
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

    // 3. init particles
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

    const clock = new THREE.Clock();
    // final. animate
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // update animate for particles
      particles.position.y = -elapsedTime * 0.02;

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

export default StarParticle;
