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
  {
    header: "MENU",
    items: [
      { label: "Item 1", icon: "th" },
      { label: "Item 2", icon: "th" },
    ],
  },
  {
    header: "MENU",
    items: [
      {
        label: "Treeview",
        icon: "bars",
        childrens: [
          { label: "Subitem", icon: "file" },
          { label: "Subitem", icon: "copy" },
        ],
      },
    ],
  },
  {
    header: "MENU",
    items: [
      {
        label: "Treeview",
        icon: "bars",
        childrens: [{ label: "Subitem", icon: "file" }],
      },
    ],
  },
  { header: "MENU", items: [{ label: "Item", icon: "th" }] },
];

function App() {
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem(
      "menuData",
      JSON.stringify(
        menuData.map((item, i) => ({
          id: i+1,
          ...item,
          header: `${item.header} ${i + 1}`,
        }))
      )
    );
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
