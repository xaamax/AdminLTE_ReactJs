import React from "react";

const Content = ({ children, container }) => (
  <div className="content-wrapper">
    {container  && (
      <div className="container-fluid">
        {children}
      </div>
    ) || (
      {children}
    )}
    
  </div>
);

export default Content;
