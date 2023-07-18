// Importa as bibliotecas necessárias
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

// Descreve o grupo de testes do componente Header
describe('Testa o componente Header', () => {
  // Teste 1: Testa o Header Geral
  test('1-Testa o Header Geral', async () => {
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

    // Obtém o botão de texto 'HOME' na tela
    const btnHome = screen.getByText(/HOME/i);

    // Simula um clique no botão 'HOME'
    userEvent.click(btnHome);

    // Aguarda até que o elemento do input de mensagem seja exibido na tela
    await waitFor(() => {
      const inputMsg = screen.getByRole('textbox');
      expect(inputMsg).toBeInTheDocument();
    });
  });
});
