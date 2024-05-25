import React from "react";
import Content from "../../common/layouts/Content";
import ContentHeader from "../../common/layouts/ContentHeader";
import { hubsData } from "../../common/constants";
import Hub from "../../common/layouts/Hub";
import Grid from "../../common/layouts/Grid";
import Row from "../../common/layouts/Row";

function Home() {
  return (
    <Content contentClass=" container-fluid">
      <ContentHeader title="Home" subtitle="Bem vindo(a)!" />
      <Row>
        {hubsData().map(({ id, icon, color, name, route }) => (
          <Grid cols="12 4" key={id}>
            <Hub {...{ icon, color, title: name, route }} />
          </Grid>
        ))}
      </Row>
    </Content>
  );
}

export default Home;
