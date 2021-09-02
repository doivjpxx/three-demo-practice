import { Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import loadable from '@loadable/component';

const Earth = loadable(() => import('../pages/Earth'));
const Home = loadable(() => import('../pages/Home'));
const House = loadable(() => import('../pages/House'));
const Light = loadable(() => import('../pages/Light'));
const Material = loadable(() => import('../pages/Material'));

const StyledNav = styled.nav`
  overflow: hidden;
  background-color: #333;

  & a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;

    &:hover {
      background-color: #ddd;
      color: black;
    }

    &:active {
      background-color: #cacc5d;
      color: white;
    }
  }

  .active {
    background-color: #cacc5d;
    color: white;
  }
`;

const AppRouter = (): JSX.Element => {
  return (
    <div>
      <StyledNav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/material">Material</NavLink>
        <NavLink to="/light">Light</NavLink>
        <NavLink to="/house">House</NavLink>
        <NavLink to="/earth">Earth</NavLink>
      </StyledNav>
      <Switch>
        <Route path="/material">
          <Material />
        </Route>
        <Route path="/light">
          <Light />
        </Route>
        <Route path="/house">
          <House />
        </Route>
        <Route path="/earth">
          <Earth />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default AppRouter;
