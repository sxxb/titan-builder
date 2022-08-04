import React from "react";

function ProgressStage(props) {
  return(
    <div className={"builder-progress-stage " + props.progressMilestone} id={props.progressStage}>
      <div className="builder-progress-container">
        <div className="builder-progress-image">
          <img src={props.progressStageImgSrc} alt={props.progressStageTitle} />
        </div>
        <div className="builder-progress-label">
          <span>{props.progressStageTitle}</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressStage;


// <div className={"builder-progress-stage" + this.state.complete} id={props.progressStage}>
