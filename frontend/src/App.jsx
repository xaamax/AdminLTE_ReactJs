import React, { useEffect } from "react";
import Header from "./common/templates/Header";
import Sidebar from "./common/templates/Sidebar";
import Footer from "./common/templates/Footer";

const userData = {
  nome: "Max Fernandes de Souza",
  email: "xaamax@gmail.com",
};

function App(props) {
  const userData = {
    nome: "Max Fernandes de Souza",
    email: "xaamax@gmail.com",
  };
  
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [])
  

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">{props.children}</div>
      <Footer />
    </div>
  );
}

export default App;
