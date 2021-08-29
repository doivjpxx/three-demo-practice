import { useEffect } from 'react';
import * as THREE from 'three';
// import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// dat
// const gui = new dat.GUI();

const House = (): JSX.Element => {
  useEffect(() => {
    // Canvas
    const canvas = document.getElementById('h');

    if (!canvas) {
      return;
    }

    const fog = new THREE.Fog('#262837', 1, 15);

    // Scene
    const scene = new THREE.Scene();

    scene.fog = fog;
    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();

    const doorColorTexture = textureLoader.load(
      '/assets/textures/door/color.jpg'
    );
    const doorAlphaTexture = textureLoader.load(
      '/assets/textures/door/alpha.jpg'
    );
    const doorAmbientOcclusionTexture = textureLoader.load(
      '/assets/textures/door/ambientOcclusion.jpg'
    );
    const doorHeightTexture = textureLoader.load(
      '/assets/textures/door/height.jpg'
    );
    const doorMetalnessTexture = textureLoader.load(
      '/assets/textures/door/metalness.jpg'
    );
    const doorRoughnessTexture = textureLoader.load(
      '/assets/textures/door/roughness.jpg'
    );
    const doorNormalTexture = textureLoader.load(
      '/assets/textures/door/normal.jpg'
    );

    const brickColorTexture = textureLoader.load(
      '/assets/textures/bricks/color.jpg'
    );
    const brickAmbientOcclusionTexture = textureLoader.load(
      '/assets/textures/bricks/ambientOcclusion.jpg'
    );
    const brickRoughnessTexture = textureLoader.load(
      '/assets/textures/bricks/roughness.jpg'
    );
    const brickNormalTexture = textureLoader.load(
      '/assets/textures/bricks/normal.jpg'
    );

    const grassColorTexture = textureLoader.load(
      '/assets/textures/grass/color.jpg'
    );
    const grassAmbientOcclusionTexture = textureLoader.load(
      '/assets/textures/grass/ambientOcclusion.jpg'
    );
    const grassRoughnessTexture = textureLoader.load(
      '/assets/textures/grass/roughness.jpg'
    );
    const grassNormalTexture = textureLoader.load(
      '/assets/textures/grass/normal.jpg'
    );

    grassColorTexture.repeat.set(8, 8);
    grassAmbientOcclusionTexture.repeat.set(8, 8);
    grassRoughnessTexture.repeat.set(8, 8);
    grassNormalTexture.repeat.set(8, 8);

    grassColorTexture.wrapS = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
    grassNormalTexture.wrapS = THREE.RepeatWrapping;

    grassColorTexture.wrapT = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
    grassNormalTexture.wrapT = THREE.RepeatWrapping;

    /**
     * House
     */
    const house = new THREE.Group();
    scene.add(house);

    // Walls
    const walls = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({
        color: '#ac8e82',
        map: brickColorTexture,
        aoMap: brickAmbientOcclusionTexture,
        normalMap: brickNormalTexture,
        roughnessMap: brickRoughnessTexture
      })
    );
    walls.geometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
    );
    walls.position.y = 2.5 / 2;
    house.add(walls);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeBufferGeometry(3.5, 1, 4),
      new THREE.MeshStandardMaterial({ color: '#b35f45' })
    );
    roof.position.y = 2.5 + 1 / 2;
    roof.rotation.y = Math.PI * 0.25;
    house.add(roof);

    const door = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2, 100, 100),
      new THREE.MeshStandardMaterial({
        color: '#aa7b7b',
        transparent: true,
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        normalMap: doorNormalTexture
      })
    );
    door.geometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
    );
    door.position.y = 1;
    door.position.z = 2 + 0.01;
    house.add(door);

    // Bushes
    const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
    const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush1.scale.set(0.5, 0.5, 0.5);
    bush1.position.set(0.8, 0.2, 2.2);

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush2.scale.set(0.25, 0.25, 0.25);
    bush2.position.set(1.5, 0.1, 2.1);

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush3.scale.set(0.45, 0.45, 0.45);
    bush3.position.set(-1.5, 0.1, 2.1);

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush4.scale.set(0.15, 0.15, 0.15);
    bush4.position.set(-1, 0.1, 2.5);

    house.add(bush1, bush2, bush3, bush4);

    // Graves
    const graves = new THREE.Group();
    scene.add(graves);

    const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
    const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 6;

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Create the mesh
      const grave = new THREE.Mesh(graveGeometry, graveMaterial);

      // Set position
      grave.position.set(x, 0.3, z);
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;

      grave.castShadow = true;

      graves.add(grave);
    }

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        color: '#a9c388',
        map: grassColorTexture,
        normalMap: grassNormalTexture,
        aoMap: grassAmbientOcclusionTexture,
        roughnessMap: grassRoughnessTexture
      })
    );
    floor.geometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
    );
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = 0;
    scene.add(floor);

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#b9ddff', 0.12);
    scene.add(ambientLight);

    // Directional light
    const moonLight = new THREE.DirectionalLight('#b9ddff', 0.12);
    moonLight.position.set(4, 5, -2);
    scene.add(moonLight);

    const doorLight = new THREE.PointLight('#ff7d47', 1, 7);
    doorLight.position.set(0, 2.2, 2.7);
    house.add(doorLight);

    // Ghosts
    const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
    scene.add(ghost1);

    const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
    scene.add(ghost2);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 4;
    camera.position.y = 2;
    camera.position.z = 5;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor('#262837');

    // SHADOWs
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    moonLight.castShadow = true;
    doorLight.castShadow = true;

    ghost1.castShadow = true;
    ghost2.castShadow = true;

    walls.castShadow = true;
    bush1.castShadow = true;
    bush2.castShadow = true;
    bush3.castShadow = true;
    bush4.castShadow = true;

    floor.receiveShadow = true;


    doorLight.shadow.mapSize.width = 256;
    doorLight.shadow.mapSize.height = 256;
    doorLight.shadow.camera.far = 7;

    ghost1.shadow.mapSize.width = 256;
    ghost1.shadow.mapSize.height = 256;
    ghost1.shadow.camera.far = 7;

    ghost2.shadow.mapSize.width = 256;
    ghost2.shadow.mapSize.height = 256;
    ghost2.shadow.camera.far = 7;

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update ghosts
      const ghost1Angle = elapsedTime * 0.5;
      ghost1.position.x = Math.cos(ghost1Angle) * 4;
      ghost1.position.z = Math.sin(ghost1Angle) * 4;
      ghost1.position.y = Math.sin(elapsedTime * 3);

      const ghost2Angle = - elapsedTime * 0.31;
      ghost2.position.x = Math.cos(ghost2Angle) * 5;
      ghost2.position.z = Math.sin(ghost2Angle) * 5;
      ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);
  return <canvas id="h" />;
};

export default House;
