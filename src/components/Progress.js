import React from "react";

import ProgressStage from '../components/ProgressStage'

function ProgressStages() {
  return(
    <div className="builder-progress-stages">
      <ProgressStage progressMilestone="complete" progressStage="stage1" progressStageTitle="Tester" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressStage="stage2" progressStageTitle="Software" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressStage="stage3" progressStageTitle="Printer" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
      <ProgressStage progressStage="stage4" progressStageTitle="Extras" progressStageImgSrc="https://www.wavecom.com.au/02_media/splashpages/calibrations/Brands-Calibrations-Splash.png" />
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
      <ProgressStages />

    </div>
  );
}

export default Progress;
