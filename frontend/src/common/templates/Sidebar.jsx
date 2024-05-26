import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Logo from "../../assets/images/logo.png";
import LogoDefault from "../../assets/images/logo_default.png";
import { appData } from "../constants";


const SideBar = () => {
  const [app, setApp] = useState({});
  
  useEffect(() => {
    setApp(appData);
  },[])

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src={app.style === "default" ? LogoDefault : Logo}
          alt="Logo Small"
          className={`brand-image elevation-3 logo-xs img-circle ${
            app.logoCircle ? "img-circle" : ""
          }`}
        />

        <span className="brand-text">
          <div className="d-flex">
            <>
              <img
                src={app.style === "default" ? LogoDefault : Logo}
                alt="Logo Large"
                className={`brand-image elevation-3 ${
                  app.logoCircle ? "img-circle" : ""
                }`}
              />
            </>
            <>
              {app.name}
            </>
          </div>
        </span>
      </a>
      <div className="sidebar">
        <Menu />
      </div>
    </aside>
  );
};

export default SideBar;
