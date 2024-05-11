import React from "react";

const ContentHeader = ({ title, subtitle, backPage }) => (
  <div className="content-header">
    <div className="d-flex justify-content-between">
      <div>
        <h1>{title}</h1>
        <small className="text-muted">{subtitle}</small>
        {/* <BreadCrumb :label="title" /> */}
      </div>
    </div>
    <hr />
    {backPage && (
      <div className="mb-2">
        <a href="javascript:history.back()">
          <i className="fas fa-arrow-left mr-2"></i>Voltar
        </a>
      </div>
    )}
  </div>
);

export default ContentHeader;
