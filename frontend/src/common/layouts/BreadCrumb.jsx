import React from "react";

function Breadcrumb({ text }) {
  return (
    <div>
      <ol className="breadcrumb float-sm-right">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li className="breadcrumb-item active">
          <span>{ text }</span>
        </li>
      </ol>
    </div>
  );
}

export default Breadcrumb;
