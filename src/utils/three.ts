import * as THREE from 'three';

type CoreType = {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
}

export const renderScene = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera): void => {
  renderer.render(scene, camera);
}

export const handleResize = (
  width = window.innerWidth, height = window.innerHeight,
  { renderer, camera, scene }: CoreType): void => {
  // Update sizes
  width = window.innerWidth;
  height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderScene(renderer, scene, camera);
};

export const start = (frameId: number, animate: () => void): void => {
  if (frameId) {
    frameId = requestAnimationFrame(animate);
  }
};

export const stop = (frameId: number): void => {
  cancelAnimationFrame(frameId);
  frameId = 0;
};