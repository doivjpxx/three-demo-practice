import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 8px;
  margin: 20px;
`;

const StyledText = styled.p`
  font-size: 3.2em;
  color: #fff;
`;

const Home = (): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef) {
      return;
    }

    const tl = gsap.timeline();
    const paragraphs = textRef.current?.querySelectorAll('p');
    paragraphs?.forEach((p) => {
      tl.from(p, { opacity: 0, duration: 0.8, y: 10 });
    });
  }, []);

  return (
    <StyledContainer ref={textRef}>
      <StyledText>
        <span style={{ borderBottom: '5px double #cacc5d' }}>Welcome</span> to
        my site
      </StyledText>
      <StyledText>
        Practice site for <span style={{ color: '#009624' }}>GSAP</span> and
        <span style={{ color: '#aeaeae' }}> Three.JS</span>
      </StyledText>
    </StyledContainer>
  );
};

export default Home;
