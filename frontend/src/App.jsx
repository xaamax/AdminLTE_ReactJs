import React, { useEffect, useState } from "react";
import Header from "./common/templates/Header";
import Sidebar from "./common/templates/Sidebar";
import Footer from "./common/templates/Footer";
import Routes from "./routes/routes";
import { appDefault, userDefault } from "./common/constants";

function App() {
  const [systemData, setSystemData] = useState({})
 
  useEffect(() => {
    if (!localStorage.getItem("appData"))
      localStorage.setItem("appData", JSON.stringify(appDefault));
      setSystemData(appDefault);

    if (!localStorage.getItem("userData"))
      localStorage.setItem("userData", JSON.stringify(userDefault));
  }, []);
 

  const [sistema, setSistema] = useState(systemData);

  const handleDarkModeStyle = () => {
    const { darkMode } = sistema;
    const novoSistema = { ...sistema, darkMode: !darkMode };
    setSistema(novoSistema);
    localStorage.setItem("appData", JSON.stringify(novoSistema));
  };

  return (
    <div className={`wrapper${systemData.darkMode ? " dark-mode" : ""}`}>
      <Header
        handleDarkMode={handleDarkModeStyle}
        darkMode={systemData.darkMode}
      />
      <Sidebar />
      <Routes />
      <Footer darkMode={systemData.darkMode} />
    </div>
  );
}

export default App;
