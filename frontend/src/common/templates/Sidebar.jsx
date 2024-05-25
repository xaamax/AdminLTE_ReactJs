import React from "react";
import Menu from "./Menu";
import Logo from "../../assets/images/logo.png";
import LogoDefault from "../../assets/images/logo_default.png";
import { appData } from "../constants";

const { name, logoCircle, style } = appData();

const SideBar = () => (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="/" className="brand-link">
      <img
        src={style === "default" ? LogoDefault : Logo}
        alt="Logo Small"
        className={`brand-image elevation-3 logo-xs img-circle ${
          logoCircle ? "img-circle" : ""
        }`}
      />

      <span className="brand-text">
        <div className="d-flex">
          <>
            <img
              src={style === "default" ? LogoDefault : Logo}
              alt="Logo Large"
              className={`brand-image elevation-3 ${
                logoCircle ? "img-circle" : ""
              }`}
            />
          </>
          <>
            <i className="fa fa-money"></i>
            {name}
          </>
        </div>
      </span>
    </a>
    <div className="sidebar">
      <Menu />
    </div>
  </aside>
);

export default SideBar;
