import React from "react";
import BreadCrumb from "./BreadCrumb";
import Row from './Row'
import Grid from './Grid'

const ContentHeader = ({ title, subtitle, backPage, breadCrumbText }) => (
  <section className="content-header">
    <Row>
      <Grid cols='12 6'>
        <h1>{title}</h1>
        <small className="text-muted">{subtitle}</small>
      </Grid>
      <Grid cols='12 6'>
      <BreadCrumb text={breadCrumbText ? title : "MyApp"} />
      </Grid>
    </Row>
    <hr />
    {backPage && (
      <div className="mb-2">
        <a href="/">
          <i className="fas fa-arrow-left mr-2"></i>Voltar
        </a>
      </div>
    )}
  </section>
);

export default ContentHeader;
