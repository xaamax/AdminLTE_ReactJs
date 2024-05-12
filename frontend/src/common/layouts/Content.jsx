import React from "react";

const Content = ({ contentClass, children }) => (
  <div className="content-wrapper">
    <div className={contentClass}>
    {children}
    </div>
  </div>
);

export default Content;
