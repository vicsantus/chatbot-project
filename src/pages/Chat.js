import React, { useContext, useState } from 'react';
import Bot from '../components/Bot';
import Display from '../components/Display';
import ChatContext from '../context/ChatContext';


function Chat() {
  const {textData, setTextData} = useContext(ChatContext);
  const {setAtualUser} = useContext(ChatContext);
  const {conversationId} = useContext(ChatContext);
  const [input, setInput] = useState('');

  function handleChange({ target }) {
    const { value } = target;
    setInput(value);
  }

  function sendMsg() {
    setAtualUser(input);
    setTextData([
      ...textData,
      {
        idConv: conversationId,
        date: new Date(Date.now()).toLocaleString(),
        who: 'user',
        msg: input
      }
    ]);
    setInput('');
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      sendMsg();
    };
  };

  return (
    <div>
      <Display />
      <Bot />
      <section className='sendMensage'>
        <input value={input} type="text" onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
        <button type="button" onClick={() => sendMsg()}>Send</button>
      </section>
    </div>
  )
}

export default Chat