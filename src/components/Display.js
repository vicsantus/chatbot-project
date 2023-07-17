/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import ChatContext from '../context/ChatContext';

function Display() {
  const {textData} = useContext(ChatContext);

  const handleClick = (e) => {
    if (e.target.className === 'msg-bot-link') {
      window.open(e.target.textContent, '_blank');
    }
  };

  return (
    <section>
      {textData?.map((texts, idx) => (
        <div
          onClick={(e) => handleClick(e)}
          key={idx} 
          className={`msg-${texts.who}`}
        >
          {texts.msg}
        </div>
      ))}
    </section>
  )
}

export default Display