// Importa as bibliotecas necessárias
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

// Descreve o grupo de testes do componente Chat
describe('Testa o componente Chat', () => {
  // Teste 1: Testa se o chat está funcionando de modo geral
  test('1-Testa se o chat esta funcionando de modo geral', async () => {
    // Renderiza o componente App dentro do ChatProvider e utiliza a função renderWithRouter para testar as rotas
    renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );

    // Obtém os elementos do input de mensagem e do botão de envio através dos papéis de acessibilidade
    const inputMsg = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');

    // Digita 'hello' no chat e clica no botão de envio
    userEvent.type(inputMsg, 'hello');
    userEvent.click(sendButton);

    // Aguarda até que a mensagem 'how are you' seja exibida na tela
    await waitFor(() => {
      expect(screen.getByText(/how are you/i)).toBeInTheDocument();
    });
  });

  // Teste 2: Testa se ao clicar em enter, envia a mensagem
  test('2-Testa se ao clicar em enter, envia a mensagem', async () => {
    // Renderiza o componente App dentro do ChatProvider e utiliza a função renderWithRouter para testar as rotas
    renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );

    // Obtém o elemento do input de mensagem através do papel de acessibilidade
    const inputMsg = screen.getByRole('textbox');
    
    // Digita 'hello' no chat e simula o evento de pressionar a tecla 'Enter'
    userEvent.type(inputMsg, 'hello');
    fireEvent.keyDown(inputMsg, { key: 'Enter', code: 'Enter', keyCode: 13 });

    // Aguarda até que a mensagem 'how are you' seja exibida na tela
    await waitFor(() => {
      expect(screen.getByText(/how are you/i)).toBeInTheDocument();
    });
  });
});
