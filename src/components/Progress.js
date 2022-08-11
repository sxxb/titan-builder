import React from "react";

import ProgressStage from '../components/ProgressStage'
import tntTitan10AImg from '../img/tntTitan10A.png';
import winpatsImg from '../img/winpats.png';
import printKitImg from '../img/printKit.png';
import testAccImg from '../img/testAcc.png';
import reviewImg from '../img/review.png';

function ProgressStages(props) {
  //progress styling - use props.stage to set progress styling
  function setProgressMilestone(n) {
    if (props.stage === n) {
      return "active";
    } else if (props.stage > n) {
      return "complete";
    } else if (props.stage < n) {
      return "incomplete";
    }
  }


  return(
    <div className="builder-progress-stages">
      <ProgressStage progressMilestone={setProgressMilestone(0)} progressStageTitle="Tester"    progressStageImgSrc={tntTitan10AImg}/>
      <ProgressStage progressMilestone={setProgressMilestone(1)} progressStageTitle="Software"  progressStageImgSrc={winpatsImg}/>
      <ProgressStage progressMilestone={setProgressMilestone(2)} progressStageTitle="Print Kit"   progressStageImgSrc={printKitImg}/>
      <ProgressStage progressMilestone={setProgressMilestone(3)} progressStageTitle="Extras"    progressStageImgSrc={testAccImg}/>
      <ProgressStage progressMilestone={setProgressMilestone(4)} progressStageTitle="Review"    progressStageImgSrc={reviewImg}/>
    </div>
  );
}

function Progress(props) {
  return(
    <div className="builder-progress">
      <ProgressStages stage={props.stage} />
    </div>
  );
}

export default Progress;
