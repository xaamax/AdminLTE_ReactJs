import React, { useState } from "react";
import Header from "./common/templates/Header";
import Sidebar from "./common/templates/Sidebar";
import Footer from "./common/templates/Footer";
import Routes from "./routes/routes";
import { appData } from "./common/constants";

function App() {
  const systemData = appData();
  const [sistema, setSistema] = useState(systemData);

  const handleDarkModeStyle = () => {
    const { darkMode } = sistema;
    const novoSistema = ({ ...sistema, darkMode: !darkMode })
    setSistema(novoSistema);
    localStorage.setItem("appData", JSON.stringify(novoSistema));
  };

  return (
    <div className={`wrapper${systemData.darkMode ? " dark-mode" : ""}`}>
      <Header handleDarkMode={handleDarkModeStyle} darkMode={systemData.darkMode} />
      <Sidebar />
      <Routes />
      <Footer darkMode={systemData.darkMode} />
    </div>
  );
}

export default App;
