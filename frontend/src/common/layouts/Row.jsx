import React from "react";

function Row({ rowClass, children }) {
  return <div className={`row ${rowClass}`}>{children}</div>;
}

export default Row;
