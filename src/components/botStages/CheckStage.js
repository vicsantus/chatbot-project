/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function CheckStage({MakeCSV}) {
  // Utilização do hook useContext para acessar os estados do contexto do ChatContext
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {userAndPass} = useContext(ChatContext);
  const {checkUser, setCheckUser} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const {timeToDo, setTimeToDo} = useContext(ChatContext);

  // Utilização do hook useEffect para realizar ações quando o estado de textData muda
  useEffect(() => {
    // A função dentro do useEffect será executada toda vez que o estado de textData mudar
    if (conversationStage === 'checkStage' && textData[textData.length - 1].who === 'user') {
      // Verificação se a etapa da conversa é 'checkStage' e se a última mensagem é do usuário

      if (timeToDo === 'pass') {
        // Se é hora de capturar a senha do usuário
        textData[textData.length - 1].who = 'user-pass'; // Caso seja a senha do user, troca who para user-pass
        textData[textData.length - 1].msg = Array.from({ length: textData[textData.length - 1]
          .msg.length }, () => '*').join(''); // Caso seja a senha do user, troca o conteudo para asterisco
        
        // Caso seja a senha do usuário, troca o conteúdo da mensagem por asteriscos
        setCheckUser({
          ...checkUser,
          pass: atualUser.toLowerCase(),
        }); // Atualiza o estado checkUser com a senha do usuário em letra minúscula
      setTimeToDo(''); // Reseta o estado "timeToDo" para uma string vazia

      }
      if (timeToDo === 'user') {
        // Se é hora de capturar o nome de usuário
        setCheckUser({
          ...checkUser,
          user: atualUser.toLowerCase(),
        }); // Atualiza o estado checkUser com o nome de usuário em letra minúscula
      setTimeToDo('pass'); // Reseta o estado "timeToDo" para uma string vazia
      }
    }
  }, [textData]); // O gatilho para o useEffect é o estado textData

  // Função para criar a conversa com base nas informações capturadas
  function makeConversation() {
    if (userAndPass.user !== checkUser.user && 'goodbye' !== atualUser.toLowerCase()) {

      // Se o nome de usuário não for igual ao capturado e a entrada não for 'goodbye'
      setTextData([ 
          ...textData,
          // Adiciona a mensagem de erro e define que é hora de capturar o nome de usuário
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'User does not exist! Retype the username!'
          }
        ]);
        setTimeToDo('user'); // Define que é hora de capturar o nome de usuário

      } else if (userAndPass.pass !== checkUser.pass && 'goodbye' !== atualUser.toLowerCase()) {
        // Se a senha não for igual à senha capturada e a entrada não for 'goodbye'
        setTextData([ 
          ...textData,
          // Adiciona a mensagem de erro e define que é hora de capturar a senha
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Password does not match! Retype the password!'
          }
        ]);
        setTimeToDo('pass'); // Define que é hora de capturar a senha

       } else if ('goodbye' === atualUser.toLowerCase()) {
        // Se a entrada for 'goodbye'
        setTextData([ 
          ...textData,
          // Adiciona a mensagem de despedida e chama a função MakeCSV
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Goodbye! To the next!'
          }
        ]);
        MakeCSV(textData); // Chama a função MakeCSV passando o array textData como argumento
        setConversationId(conversationId + 1); // Incrementa o conversationId e atualiza o estado
        setConversationStage('start'); // Define a próxima etapa da conversa como 'start' novamente

      } else {
        // Se não houver erros, mostra as opções para o usuário
        setTextData([ 
          ...textData,
          // Adiciona as opções e define a próxima etapa como 'loanStage'
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: `1 - Do you want to apply for a loan?`
          },
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: `2 - Loan conditions`
          },
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: `3 - Help`
          }
        ]);
        setConversationStage('loanStage'); // Define a próxima etapa da conversa como 'loanStage'
      }
  }

  // Utilização do hook useEffect para realizar ações quando o estado de "timeToDo" muda
  useEffect(() => {
    // A função dentro do useEffect será executada toda vez que o estado "timeToDo" mudar
    if (timeToDo === '' && conversationStage === 'checkStage') makeConversation();
    // Verifica se "timeToDo" está vazio e se a etapa da conversa é "checkStage", 
    // então chama a função makeConversation()
  }, [timeToDo]); // O gatilho para o useEffect é o estado "timeToDo"

  useEffect(() => {
    // Outro hook useEffect que será executado toda vez que o estado de textData mudar
    if (conversationStage === 'checkStage' && textData[textData.length - 1].who === 'user') {
      // Verificação se a etapa da conversa é 'checkStage' e se a última mensagem é do usuário
      if (checkUser.pass === undefined) {
        // Se a senha do usuário não foi capturada ainda
        setCheckUser({
            ...checkUser,
            pass: atualUser.toLowerCase(),
          }); // Atualiza o estado checkUser com a senha do usuário em letra minúscula
      };
      if (timeToDo === '') makeConversation(); // Se "timeToDo" está vazio, chama a função makeConversation()
    }
  }, [textData]); // O gatilho para o useEffect é o estado textData
}

export default CheckStage