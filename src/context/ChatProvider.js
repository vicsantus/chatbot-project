import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ChatContext from './ChatContext';

export default function ChatProvider({ children }) {
  const [textData, setTextData] = useState([]);
  const [atualUser, setAtualUser] = useState('');
  const [conversationId, setConversationId] = useState(0);
  const [conversationStage, setConversationStage] = useState('start');
  const [userAndPass, setUserAndPass] = useState({user: 'lexart', pass: 'lexart123'});
  const [checkUser, setCheckUser] = useState({});

  const value = useMemo(() => ({
    textData,
    setTextData,
    conversationId,
    setConversationId,
    atualUser,
    setAtualUser,
    conversationStage,
    setConversationStage,
    userAndPass,
    setUserAndPass,
    checkUser,
    setCheckUser
  }), [textData,
    setTextData, 
    conversationId, 
    setConversationId, 
    atualUser, 
    setAtualUser, 
    conversationStage, 
    setConversationStage,
    userAndPass,
    setUserAndPass, checkUser, setCheckUser]);

  return (  
    <ChatContext.Provider value={ value }>
      { children }
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;