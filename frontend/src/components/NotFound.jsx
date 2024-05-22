import React from 'react';
import Content from '../common/layouts/Content';

function NotFound() {
  return (
    <Content contentClass='container-fluid p-4'> 
      <h3>
        <strong>Erro 404</strong>
      </h3>
      <hr />
      <h1>
        <strong>Ops,</strong>
        <br />
        Página não encontrada!
      </h1>
      <p>
        <a href='/'>Voltar ao Home.</a>
      </p>
    </Content>
  );
}

export default NotFound;
