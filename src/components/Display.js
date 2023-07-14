import React, { useContext } from 'react';
import ChatContext from '../context/ChatContext';

function Display() {
  const {textData} = useContext(ChatContext);

  return (
    <section>
      {textData?.map((texts, idx) => (
        <p key={idx} className={`msg-${texts.who}`}>{texts.msg}</p>
      ))}
    </section>
  )
}

export default Display