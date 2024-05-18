import React, { useEffect, useState } from "react";
import Header from "./common/templates/Header";
import Sidebar from "./common/templates/Sidebar";
import Footer from "./common/templates/Footer";
import Routes from "./routes/routes";
import { userData, menuData } from "./common/constants/index";

function App() {
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem(
      "menuData",
      JSON.stringify(
        menuData.map((menu, i) => ({
          id: i + 1,
          ...menu,
          header: `${menu.header} ${i + 1}`,
          items: menu.items.map((item, itemIndex) => {
            return {
              id: itemIndex + 1,
              ...item,
              childrens: item.childrens
              ? item.childrens.map((children, childrenIndex) => {
                return {
                  id: childrenIndex + 1,
                  ...children,
                };
              })
              : [],
            };
          }),
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
