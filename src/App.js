import { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Chat from './pages/Chat';


export const NoMatch = () => <h1 style={{color: '#fff'}}>Página não encontrada</h1>;
// Componente funcional que renderiza a página de "Página não encontrada"

export default function App() {

  useEffect(() => {
    // Define o título da página usando a API de Documentos
    document.title = 'Chatbot Lexart - Made by Victor Santos';
  }, []);

  return (
    <div className='main-page'>
      {/* Navegação por links usando o componente "Link" do react-router-dom */}
      <header className='header'>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
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
