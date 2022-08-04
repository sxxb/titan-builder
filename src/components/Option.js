import React from "react";

function BulletPoints({bulletPoints}) {
  return (
    <ul className="builder-option-description">
      {bulletPoints.map(bulletPoint => {
        return <li key={bulletPoint}>{bulletPoint}</li>;
      })}
    </ul>
  );
}

function Option(props) {
  return(
    <div className="builder-option" id={props.id}>
      <div className="builder-option-image">
        <img src={props.imgsrc} alt={props.name} />
      </div>
      <div className="builder-option-description">
        <p className="builder-option-title">{props.name}</p>
        <p className="builder-option-price">{props.price}</p>
        <BulletPoints bulletPoints={props.bulletPoints} />
      </div>
    </div>
  );
}

export default Option;
