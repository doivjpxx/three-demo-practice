import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Box(props: any): JSX.Element {
  const mesh = useRef<any>();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 2, 3]} />
      <meshPhongMaterial color={'red'} flatShading={true} />
    </mesh>
  );
}

export default Box;
