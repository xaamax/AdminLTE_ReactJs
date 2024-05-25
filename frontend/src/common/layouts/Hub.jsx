import React from "react";

function Hub({ icon, color, title, route }) {
  return (
    <div className={`small-box ${color}`}>
      <div className="inner">
        <h5>{title}</h5>
        <div className="p-4 my-2"></div>
      </div>
      <div className="icon">
        <i className={`fas fa-${icon}`}></i>
      </div>
      <a href={route} className="small-box-footer">
        Mais informações <i className="fas fa-arrow-circle-right"></i>
      </a>
    </div>
  );

  //HubPadrão
  {
    /* <div className={`small-box ${color}`}>
<div className="inner" style={{ textAlign: 'center' }}>
  <i className={`fas fa-${icon} fa-2x`} style={{ marginBottom: '10px' }}></i>
  <p>{title}</p>
</div>
</div> */
  }
}

export default Hub;
