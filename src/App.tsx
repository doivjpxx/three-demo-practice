import styled from 'styled-components';
import * as THREE from 'three';
import Cube, { CubeProps } from './components/Cube';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function App(): JSX.Element {
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
    }
  ];
  return (
    <Container>
      {arr.map((x: CubeProps) => (
        <Cube id={x.id} key={x.id} geometry={x.geometry} color={x.color} />
      ))}
    </Container>
  );
}

export default App;
