import React from "react";
import BreadCrumb from "./BreadCrumb";

const ContentHeader = ({ title, subtitle, backPage, breadCrumbText }) => (
  <div className="content-header">
    <div className="d-flex justify-content-between">
      <div>
        <h1>{title}</h1>
        <small className="text-muted">{subtitle}</small>
      </div>
      <div>
      <BreadCrumb text={breadCrumbText ? title : "MyApp"} />
      </div>
    </div>
    <hr />
    {backPage && (
      <div className="mb-2">
        <a href="/">
          <i className="fas fa-arrow-left mr-2"></i>Voltar
        </a>
      </div>
    )}
  </div>
);

export default ContentHeader;
