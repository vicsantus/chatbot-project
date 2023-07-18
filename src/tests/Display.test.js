// Importa as bibliotecas necessárias
import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import awaitForATime from './helpers/awaitForATime';
import { renderWithRouter } from './helpers/renderWith';

// Função que realiza a renderização do componente App dentro do ChatProvider e executa algumas ações
const rendOk = async () => {
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

  // Aguarda até que a mensagem do usuário seja exibida na tela e verifica se ela tem a classe 'msg-user'
  await waitFor(() => {
    const userMessage = screen.getByText(/hello/i);
    expect(userMessage).toHaveClass('msg-user');
  });
  
  // Aguarda até que a mensagem do bot seja exibida na tela e verifica se ela tem a classe 'msg-bot'
  await waitFor(() => {
    const botMessage = screen.getByText(/I am the Lexart Chatbot/i);
    expect(botMessage).toHaveClass('msg-bot');
  });
};

// Descreve o grupo de testes do componente Display
describe('Testa o componente Display', () => {
  // Configuração após cada teste para limpar os mocks
  afterEach(() => {
    jest.clearAllMocks();
  })

  // Teste 1: Verifica se o Display renderiza corretamente usando a função rendOk
  test('1-Testa se o Display renderiza corretamente', rendOk)

  // Teste 2: Testa a função de link do Display
  test('2-Testa a função de link do Display', async () => {
    jest.setTimeout(30000);
    
    // Cria um mock para a função window.open para simular o comportamento de abrir uma nova aba
    const mockWindowOpen = jest.fn();
    window.open = mockWindowOpen;

    // Executa a função rendOk que realiza a renderização do componente App e executa ações iniciais
    rendOk();
    
    // Obtém novamente os elementos do input de mensagem e do botão de envio
    const inputMsg = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    
    // Função auxiliar para enviar a mensagem 'lexart'
    const sendLexart = () => {
      userEvent.type(inputMsg, 'lexart');
      userEvent.click(sendButton);
    }
    
    // Aguarda 500ms antes de executar a função sendLexart
    await awaitForATime(sendLexart, 500);

    // Função auxiliar para enviar a mensagem 'lexart123'
    const sendLexart123 = () => {
      userEvent.type(inputMsg, 'lexart123');
      userEvent.click(sendButton);
    }

    // Aguarda 500ms antes de executar a função sendLexart123
    await awaitForATime(sendLexart123, 500)
    
    // Função auxiliar para enviar a mensagem '1'
    const send1 = () => {
      userEvent.type(inputMsg, '1');
      userEvent.click(sendButton);
    }
    // Aguarda 500ms antes de executar a função send1
    await awaitForATime(send1, 500)
    
    // Aguarda até que a mensagem do bot com o link seja exibida na tela
    await waitFor(() => {
      const divLink = screen.getByText('https://lexartlabs.com/products/');
      expect(divLink).toHaveClass('msg-bot-link');
    });

    // Clica no link exibido pelo bot
    userEvent.click(screen.getByText('https://lexartlabs.com/products/'));

    // Aguarda até que a função window.open seja chamada com a URL do link
    await waitFor(() => {
      expect(mockWindowOpen)
      .toHaveBeenCalledWith('https://lexartlabs.com/products/ ', '_blank');
    });
  });
});
