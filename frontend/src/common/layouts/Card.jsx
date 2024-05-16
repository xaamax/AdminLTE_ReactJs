import React from "react";

function Card({ cardClass, header, icon, children }) {
  return (
    <div className={`card ${cardClass}`}>
        {header && (
                    <div className="card-header">
                    <h3 className="card-title">
                      <i className={`fas fa-${icon} mr-2`}></i>
                      {header}
                    </h3>
                  </div>
        )}
      <div className="card-body">{children} </div>
    </div>
  );
}

export default Card;
