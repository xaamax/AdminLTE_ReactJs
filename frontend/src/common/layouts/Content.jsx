import React from "react";

const Content = ({ contentClass, children }) => (
  <section className="content-wrapper">
    <div className={contentClass}>
    {children}
    </div>
  </section>
);

export default Content;
