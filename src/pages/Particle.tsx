import Card from '../components/Card';
import StarParticle from '../components/particle/StarParticle';
import SphereParticle from '../components/particle/SphereParticle';
import { Container } from '../shared/styled';

const Particle = (): JSX.Element => {
  return (
    <Container>
      <Card width={'100%'} height={'500px'}>
        <SphereParticle />
      </Card>
      <Card width={'100%'} height={'500px'}>
        <StarParticle />
      </Card>
    </Container>
  );
};

export default Particle;
