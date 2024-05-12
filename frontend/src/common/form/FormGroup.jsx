import React from "react";

function FormGroup({ children }) {
  return (
    <form>
      <div className="form-group">{children}</div>
    </form>
  );
}

export default FormGroup;
