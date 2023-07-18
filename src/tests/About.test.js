// Importa as bibliotecas necessárias
import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

// Descreve o grupo de testes do componente About
describe('Testa o componente About', () => {
  // Teste 1: Verifica se a rota About existe corretamente
  test('1-Testa se a rota About existe corretamente', async () => {
    // Renderiza o componente App dentro do ChatProvider e utiliza a função renderWithRouter para testar as rotas
    const { history } = renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );

    // Utiliza a função act para realizar uma ação assíncrona de navegação para a rota '/about'
    act(() => {
      history.push('/about');
    });

    // Obtém o elemento do texto 'About Page' na tela
    const inputMsg = screen.getByText(/About Page/i);

    // Aguarda até que o elemento 'About Page' seja exibido na tela
    await waitFor(() => {
      expect(inputMsg).toBeInTheDocument();
    });
  });
});
