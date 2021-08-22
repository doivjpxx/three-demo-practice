import styled from 'styled-components';

const StyledCard = styled.div`
  margin: 8px;
  padding: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
  height: 300px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Card = ({ children }: Props): JSX.Element => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
