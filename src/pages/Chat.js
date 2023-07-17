import React, { useContext, useState } from 'react';
import Bot from '../components/Bot';
import Display from '../components/Display';
import ChatContext from '../context/ChatContext';


function Chat() {
  // Utilização do hook useContext para acessar os estados do contexto do ChatContext
  const {textData, setTextData} = useContext(ChatContext);
  const {setAtualUser} = useContext(ChatContext);
  const {conversationId} = useContext(ChatContext);

  // Utilização do hook useState para criar o estado "input" com valor inicial vazio
  const [input, setInput] = useState('');

  // Função que atualiza o estado "input" com o valor do input de texto
  function handleChange({ target }) {
    const { value } = target;
    setInput(value);
  }

  // Função para enviar a mensagem digitada pelo usuário
  function sendMsg() {
    setAtualUser(input); // Define o usuário atual com o valor digitado no input
    setTextData([
      ...textData,
      // Adiciona uma nova mensagem ao array "textData" com as informações da mensagem digitada
      {
        idConv: conversationId,
        date: new Date(Date.now()).toLocaleString(),
        who: 'user',
        msg: input
      }
    ]);
    setInput(''); // Reseta o input para uma string vazia após o envio da mensagem
  }

  // Função para enviar a mensagem quando a tecla "Enter" é pressionada
  const handleKeyDown = (event) => {
    // Se a tecla pressionada for "Enter" (código 13), chama a função sendMsg()
    if (event.keyCode === 13) {
      sendMsg();
    };
  };

  return (
    <>
      <h1 title="Type 'Hello', 'I want' or 'Good' to start a conversation. 
      Or type 'Goodbye' to end a conversation whenever you want." style={{color: '#fff'}}>Lexart Chatbot</h1>
      <div>
        {/* Componente que exibe as mensagens */}
        <Display />

        {/* Componente que representa o bot */}
        <Bot />

        {/* Seção para digitar e enviar mensagens */}
        <section className='sendMensage'>
          <input value={input} type="text" onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
          {/* O valor do input é definido pelo estado "input", ao digitar, a função handleChange atualiza o estado */}

          <button type="button" onClick={() => sendMsg()}>Send</button>
          {/* Ao clicar no botão "Send", a função sendMsg é chamada para enviar a mensagem */}
        </section>
      </div>
    </>
  )
}

export default Chat