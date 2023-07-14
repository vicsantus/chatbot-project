import MakeCSV from './MakeCSV';
import StartStage from './botStages/StartStage';
import UserStage from './botStages/UserStage';

function Bot() {
  return(
    <>
      <StartStage MakeCSV={MakeCSV} />
      <UserStage MakeCSV={MakeCSV} />
    </>
  )
}

export default Bot