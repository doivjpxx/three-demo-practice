import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const textureLoader = new THREE.TextureLoader();

const Earth = (): JSX.Element => {
  const mount = useRef<HTMLDivElement>(null);

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.x = 25;
    camera.position.y = 10;
    camera.position.z = 63;
    return camera;
  };

  const createDirectionalLight = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 10, -50);
    return directionalLight;
  };

  const createAmbientLight = () => new THREE.AmbientLight('#ffffff', 0.12);

  const createBackground = () => {
    const bgTexture = textureLoader.load(
      '/assets/textures/earth/starry_background.jpg'
    );
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.NearestFilter;
    return bgTexture;
  };

  const createCloudMaterial = () => {
    const cloudTexture = textureLoader.load(
      '/assets/textures/earth/clouds_color.png'
    );

    const cloudMaterial = new THREE.MeshBasicMaterial();
    cloudMaterial.map = cloudTexture;
    cloudMaterial.transparent = true;
    cloudMaterial.opacity = 0.5;
    cloudMaterial.blending = THREE.AdditiveBlending;

    return cloudMaterial;
  };

  const createEarthMaterial = () => {
    const earthColorTexture = textureLoader.load(
      '/assets/textures/earth/color.jpg'
    );
    const earthBumpTexture = textureLoader.load(
      '/assets/textures/earth/bump.jpg'
    );
    const earthNormalMap = textureLoader.load(
      '/assets/textures/earth/normal.jpg'
    );
    const earthSpecularMap = textureLoader.load(
      '/assets/textures/earth/specular.jpg'
    );

    const material = new THREE.MeshPhongMaterial({
      map: earthColorTexture,
      bumpMap: earthBumpTexture,
      bumpScale: 0.05,
      normalMap: earthNormalMap,
      normalScale: new THREE.Vector2(0.5, 0.7),
      specularMap: earthSpecularMap,
      specular: new THREE.Color(0x262626)
    });
    return material;
  };

  useEffect(() => {
    if (!mount.current) {
      return;
    }
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId = 0;

    // 1. init scene
    const scene = new THREE.Scene();

    const background = createBackground();
    scene.background = background;

    const directionalLight = createDirectionalLight();
    scene.add(directionalLight);

    const ambientLight = createAmbientLight();
    scene.add(ambientLight);

    const earthGeometry = new THREE.SphereGeometry(15, 60, 60);
    const earthMaterial = createEarthMaterial();
    const earthmesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthmesh);

    const cloudGeometry = new THREE.SphereGeometry(15.25, 60, 60);
    const cloudMaterial = createCloudMaterial();
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.name = 'clouds';
    scene.add(cloudMesh);

    const camera = createCamera();
    camera.lookAt(scene.position);
    scene.add(camera);

    const controls = new OrbitControls(camera, mount.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxDistance = 500;
    controls.update();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const animate = () => {
      // Update objects
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

    // START THREE
    start();

    return () => {
      stop();
      scene.remove(earthmesh, cloudMesh);
      earthmesh.clear();
      cloudMesh.clear();
      window.removeEventListener('resize', handleResize);
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} />;
};

export default Earth;
