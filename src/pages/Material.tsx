import * as THREE from 'three';
import Cube, { CubeProps } from '../components/Cube';
import { Container } from '../shared/styled';

const Material = (): JSX.Element => {
  const arr: CubeProps[] = [
    {
      id: 1,
      geometry: new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      color: 0x00ff00
    },
    {
      id: 2,
      geometry: new THREE.SphereGeometry(0.5, 12, 8),
      color: 0xffff00
    },
    {
      id: 3,
      geometry: new THREE.DodecahedronGeometry(0.5),
      color: 0xff0000
    },
    {
      id: 4,
      geometry: new THREE.CylinderGeometry(0.5, 0.5, 1, 6),
      color: 0xff00ff
    }
  ];
  return (
    <Container>
      {arr.map((x: CubeProps) => (
        <Cube id={x.id} key={x.id} geometry={x.geometry} color={x.color} />
      ))}
    </Container>
  );
};

export default Material;
