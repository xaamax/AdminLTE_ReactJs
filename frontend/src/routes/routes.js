/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Home, Config, NotFound } from "./modules"
import { Route, Routes } from 'react-router-dom';
import { routesData } from '../common/constants';

export default () => {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/config' exact element={<Config />} />
      {routesData().map(({ id, path, component }) => (
        <Route
          key={id}
          path={path}
          element={React.createElement(require(`../components/${component}/${component}`).default)}
        />
      ))}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}