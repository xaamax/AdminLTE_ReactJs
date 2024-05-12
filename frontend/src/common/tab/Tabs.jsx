import React from "react";

function Tabs({ children }) {
  return (
    <div className="card card-primary card-outline card-outline-tabs">
      <div className="card-header p-0 border-bottom-0">{children}</div>
    </div>
  );
}

export default Tabs;
