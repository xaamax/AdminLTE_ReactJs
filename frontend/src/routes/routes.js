/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Home from '../components/Home/Home';
import Config from '../components/Config/Config';
import NotFound from '../components/NotFound';
import { Route, Routes } from 'react-router-dom';

export default () => {
  return(
      <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/config' exact element={<Config />} />
      <Route path='*' element={<NotFound />} />
      </Routes>
  );
}