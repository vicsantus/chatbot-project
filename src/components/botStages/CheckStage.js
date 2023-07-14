/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import ChatContext from '../../context/ChatContext';

function CheckStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {userAndPass} = useContext(ChatContext);
  const {checkUser, setCheckUser} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const [timeToDo, setTimeToDo] = useState('');


  useEffect(() => {
    if (conversationStage === 'checkStage') {
      if (checkUser.pass === undefined) {
        setCheckUser({
            ...checkUser,
            pass: atualUser.toLowerCase(),
          });
      };
      if (userAndPass.user !== checkUser.user && 'goodbye' === atualUser.toLowerCase()) {
        setTimeToDo('user');
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'User does not exist! Retype the username!'
          }
        ]);
      } else if (userAndPass.pass !== checkUser.pass && 'goodbye' === atualUser.toLowerCase()) {
        setTimeToDo('pass');
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Password does not match! Retype the password!'
          }
        ]);
       } else if ('goodbye' === atualUser.toLowerCase()) {
        MakeCSV(textData);
        setConversationId(conversationId + 1);
        setConversationStage('start');
      } else if (atualUser) {
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Did not understand what you said.'
          }
        ]);
      }
    }
  }, [atualUser]);

// ELE ESTA BUGANDO ISSO AQUI
  useEffect(() => {
    if (timeToDo === 'pass') {
      setCheckUser({
          ...checkUser,
          pass: atualUser.toLowerCase(),
        });
      }
    if (timeToDo === 'user') {
      setCheckUser({
          ...checkUser,
          user: atualUser.toLowerCase(),
        });
      }
    setTimeToDo('');
  }, [timeToDo])
}

export default CheckStage