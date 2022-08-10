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
      <h1>Build Your TnT Titan</h1>
      <Stages />
    </form>
  );
}

export default Form;
