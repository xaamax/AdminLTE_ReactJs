/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Home from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";

export default () => {
  return(
      <Routes>
      <Route path="/" exact element={<Home />} />
      </Routes>
  );
}