import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';


export const About = () => <h1>Você está na página Sobre</h1>;
export const NoMatch = () => <h1>Página não encontrada</h1>;

export default function App() {
  return (
    <div>
      <Link to="/">Início</Link>
      <br />
      <Link to="/about">Sobre</Link>
      <Switch>
        <Route exact path="/" component={Chat} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
