import React from "react";

function FormGroup({ formClass, children }) {
  return (
      <div className={`form-group${formClass || ""}`}>{children}</div>
  );
}

export default FormGroup;
