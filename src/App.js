import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Chat from './pages/Chat';


export const NoMatch = () => <h1>Página não encontrada</h1>;
// Componente funcional que renderiza a página de "Página não encontrada"

export default function App() {
  return (
    <div>
      {/* Navegação por links usando o componente "Link" do react-router-dom */}
      <header className='header'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>

      {/* Switch para renderizar apenas a primeira Route que corresponda ao caminho */}
      <Switch>
        {/* Rota exata para a página principal, renderiza o componente Chat */}
        <Route exact path="/" component={Chat} />

        {/* Rota para a página "Sobre", renderiza o componente funcional "About" */}
        <Route path="/about" component={About} />

        {/* Rota padrão para quando nenhuma outra rota corresponder, renderiza o componente funcional "NoMatch" */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
