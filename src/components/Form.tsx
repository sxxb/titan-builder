import React from "react";

import Stages from '../components/Stages.tsx'

// @ts-check

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }
  return(
    <form className="builder-form">
      <Stages />
    </form>
  );
}

export default Form;
