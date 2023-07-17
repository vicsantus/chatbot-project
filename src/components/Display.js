/* eslint-disable react-hooks/exhaustive-deps */
// Aviso desabilitado para a dependência exhaustiveness do ESLint

import React, { useContext, useEffect, useRef } from 'react';
import ChatContext from '../context/ChatContext';

function Display() {
  // Utilização do hook useContext para acessar o estado "textData" do contexto do ChatContext
  const {textData} = useContext(ChatContext);
  const displayRef = useRef(null); // Criamos uma referencia ao display

  // Função para lidar com o clique em um link do bot
  const handleClick = (e) => {
    // Verifica se o elemento clicado tem a classe "msg-bot-link"
    if (e.target.className === 'msg-bot-link') {
      // Se sim, abre o link em uma nova aba
      window.open(e.target.textContent, '_blank');
    }
  };

  const scrollToBottom = () => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  }; // Função ajusta o scroll para o elemente referente

  useEffect(() => {
    scrollToBottom();
  }, [textData]); // Toda vez que atualiza o textData, atualiza a referencia a ultima msg
  // Isso faz o scroll descer sempre para a ultima mensagem ao atualizar textData

  return (
    <section className='display' ref={displayRef}> {/* Adicionamos a referencia ao display */}
      {/* Mapeia o array "textData" para renderizar as mensagens */}
      {textData?.map((texts, idx) => (
        // Renderiza cada mensagem como uma div com a classe correspondente ao remetente (who)
        <div
          onClick={(e) => handleClick(e)} // Configura o evento de clique na div
          key={idx} // Define uma chave única para cada div renderizada
          className={`msg-${texts.who}`} // Define a classe da div com base no remetente da mensagem
        >
          {texts.msg} {/* Exibe o conteúdo da mensagem */}
        </div>
      ))}
    </section>
  )
}

export default Display