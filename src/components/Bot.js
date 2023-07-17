import MakeCSV from './MakeCSV';
import CheckStage from './botStages/CheckStage';
import LoanStage from './botStages/LoanStage';
import StartStage from './botStages/StartStage';
import UserStage from './botStages/UserStage';

function Bot() {
  return(
    <>
      <StartStage MakeCSV={MakeCSV} />
      <UserStage MakeCSV={MakeCSV} />
      <CheckStage MakeCSV={MakeCSV} />
      <LoanStage MakeCSV={MakeCSV} />
    </>
  )
}

export default Bot