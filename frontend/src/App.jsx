import React, { useEffect, useState } from "react";
import Header from "./common/templates/Header";
import Sidebar from "./common/templates/Sidebar";
import Footer from "./common/templates/Footer";
import Routes from "./routes/routes";

const userData = {
  nome: "Max Fernandes de Souza",
  email: "xaamax@gmail.com",
};

const menuData = [
  { header: "MENU", text: "Item", icon: "th" },
  {
    header: "MENU",
    text: "Treeview",
    icon: "bars",
    childrens: [
      { text: "Subitem", icon: "file" },
      { text: "Subitem", icon: "copy" },
    ],
  },
  {
    header: "MENU",
    text: "Treeview",
    icon: "bars",
    childrens: [{ text: "Subitem", icon: "file" }],
  },
  { header: "MENU", text: "Item", icon: "th" },
];

function App() {
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("menuData", JSON.stringify(menuData.map((item, i) => ({ key: i, ...item, header: `${item.header} ${i+1}` }))));
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`wrapper ${darkMode ? "dark-mode" : ""}`}>
      <Header handleDarkMode={handleDarkMode} darkMode={darkMode} />
      <Sidebar />
      <Routes />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
