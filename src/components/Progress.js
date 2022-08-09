import React from "react";

import ProgressStage from '../components/ProgressStage'

function ProgressStages(props) {
  //progress styling - use props.stage to set progress styling
  function setProgressMilestone(n) {
    let progressMilestone = n;
    if (props.stage === n) {
      console.log(n + ' is the current stage')
    } else if (props.stage > n) {
      console.log(n + ' is a past stage')
    } else if (props.stage < n) {
      console.log(n + ' is a future stage')
    }
  }

  return(
    <div className="builder-progress-stages">
      <ProgressStage progressMilestone={setProgressMilestone(0)} progressStage="0" progressStageTitle="Tester" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(1)} progressStage="1" progressStageTitle="Software" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(2)} progressStage="2" progressStageTitle="Printer" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(3)} progressStage="3" progressStageTitle="Extras" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressMilestone={setProgressMilestone(4)} progressStage="4" progressStageTitle="Review" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
    </div>
  );
}

function ProgressIndicator(props) {
  return(
    <div className="builder-progress-indicator">
      <progress value={props.progressValue} max="100"></progress>
    </div>
  );
}

function Progress(props) {
  return(
    <div className="builder-progress">
      <ProgressIndicator progressValue={props.stage * 20 + 20}/>
      <ProgressStages stage={props.stage}/>
    </div>
  );
}

export default Progress;
