// Importação das funções de diferentes estágios do bot
import MakeCSV from './MakeCSV';
import CheckStage from './botStages/CheckStage';
import LoanStage from './botStages/LoanStage';
import StartStage from './botStages/StartStage';
import UserStage from './botStages/UserStage';

function Bot() {
  // O componente Bot é uma composição dos diferentes estágios do bot

  return(
    <>
      {/* Os componentes recebem a função MakeCSV como props */}
      {/* Componente StartStage que representa o estágio inicial da conversa */}
      <StartStage MakeCSV={MakeCSV} />

      {/* Componente UserStage que representa o estágio em que o bot interage com o usuário */}
      <UserStage MakeCSV={MakeCSV} />

      {/* Componente CheckStage que representa o estágio de verificação de usuário */}
      <CheckStage MakeCSV={MakeCSV} />

      {/* Componente LoanStage que representa o estágio de solicitação de empréstimo */}
      <LoanStage MakeCSV={MakeCSV} />
    </>
  )
}

export default Bot