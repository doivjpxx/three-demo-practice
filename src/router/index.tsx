import { Switch, Route, NavLink } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import loadable from '@loadable/component';
import Particle from '../pages/Particle';

const Earth = loadable(() => import('../pages/Earth'));
const Home = loadable(() => import('../pages/Home'));
const House = loadable(() => import('../pages/House'));
const Light = loadable(() => import('../pages/Light'));
const Material = loadable(() => import('../pages/Material'));

const StyledNavGlobal = createGlobalStyle`
  .nav-item {
    margin: 8px;
    
    &::after {
      content: '';
      display: block;
      width: 0px;
      height: 4px;
      background: #cacc5d;
      transition: 0.2s;
      margin-top: -10px;
    }
    
    &:hover::after {
      width: 100%;
    }
  }

  .nav-link {
    padding: 15px 5px;
    transition: 0.2s;
  }

  .navbar-nav .nav-link {
    color: #fff;
    font-weight: bold;
    font-size: 18px;

    &.active {
      width: 100%;
      height: 51px;
      border-bottom: .25rem solid transparent;
      border-bottom-color: #cacc5d;
    }
  }
`;

const AppRouter = (): JSX.Element => {
  return (
    <div>
      <StyledNavGlobal />
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/particle" className="nav-link">
              Particle
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/material" className="nav-link">
              Material
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/light" className="nav-link">
              Light
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/house" className="nav-link">
              House
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/earth" className="nav-link">
              Earth
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/particle">
          <Particle />
        </Route>
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
