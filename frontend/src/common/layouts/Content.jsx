import React from "react";

const Content = ({ contentClass, children }) => (
  <div className="content-wrapper">
    <section className="content">
      <div className={contentClass}>{children}</div>
    </section>
  </div>
);

export default Content;
