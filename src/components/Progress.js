import React from "react";

import ProgressStage from '../components/ProgressStage'

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
      <ProgressStage progressMilestone={setProgressMilestone(0)} progressStageTitle="Tester" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(1)} progressStageTitle="Software" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(2)} progressStageTitle="Printer" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(3)} progressStageTitle="Extras" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(4)} progressStageTitle="Review" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
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
