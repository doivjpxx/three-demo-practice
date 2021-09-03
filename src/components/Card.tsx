import styled from 'styled-components';

const StyledCard = styled.div<Props>`
  margin: 12px;
  padding: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: ${(props) => props.width ?? '300px'};
  height: ${(props) => props.height ?? '300px'};

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

type Props = {
  width?: string;
  height?: string;
  children: JSX.Element | JSX.Element[];
};

const Card = ({ width, height, children }: Props): JSX.Element => {
  return (
    <StyledCard width={width} height={height}>
      {children}
    </StyledCard>
  );
};

export default Card;
