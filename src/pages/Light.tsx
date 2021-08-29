import { useRef } from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { planeSize } from '../const/config';

const Light = (): JSX.Element => {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) {
      return;
    }
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId = 0;

    // 1. init scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    // 2. init light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
    directionalLight.position.set(1, 0.25, 0);
    scene.add(directionalLight);

    // Hemisphere light
    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
    scene.add(hemisphereLight);

    // Rect area light
    const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 4, 4);
    rectAreaLight.position.set(-1.5, 0, 1.5);
    rectAreaLight.lookAt(new THREE.Vector3());
    scene.add(rectAreaLight);

    // Spot light
    const spotLight = new THREE.SpotLight(
      0x78ff00,
      0.5,
      10,
      Math.PI * 0.1,
      0.25,
      1
    );
    spotLight.position.set(0, 2, 3);
    scene.add(spotLight);

    spotLight.target.position.x = -0.75;
    scene.add(spotLight.target);

    // 3. init objects
    const material = new THREE.MeshStandardMaterial();
    material.roughness = 0.4;

    // Objects

    // init checkerboard texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'https://threejsfundamentals.org/threejs/resources/images/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const meshPlane = new THREE.Mesh(planeGeo, planeMat);
    meshPlane.rotation.x = Math.PI * -0.5;
    meshPlane.position.y = -0.65;

    const sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(2, 32, 32),
      material
    );
    sphere.position.x = -10;
    sphere.position.y = 2;

    const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 3, 3), material);
    cube.position.y = 2;

    const torus = new THREE.Mesh(
      new THREE.TorusBufferGeometry(2, 0.5, 32, 64),
      material
    );
    torus.position.x = 8;
    torus.position.y = 2;

    scene.add(sphere, cube, torus, meshPlane);

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 30);

    scene.add(camera);

    // init renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, mount.current);
    controls.target.set(0, 5, 0);
    controls.update();

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;
      cube.rotation.y = 0.5 * elapsedTime;
      torus.rotation.y = 0.5 * elapsedTime;

      sphere.rotation.x = 0.3 * elapsedTime;
      cube.rotation.x = 0.3 * elapsedTime;
      torus.rotation.x = 0.3 * elapsedTime;

      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      // Update sizes
      width = window.innerWidth;
      height = window.innerHeight;

      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
      scene.remove(cube);
      material.dispose();
      meshPlane.remove();
      sphere.remove();
      cube.remove();
      torus.remove();
      window.removeEventListener('resize', handleResize);
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mount} />;
};

export default Light;
