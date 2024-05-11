import React from "react";
import Menu from "./Menu";
import Logo from "../../assets/images/logoM.png";

const SideBar = () => (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="/" className="brand-link">
        <img
          src={Logo}
          alt="Logo Small"
          className="brand-image elevation-3 logo-xs"
        />

      <span className="brand-text">
        <div className="d-flex">
          <>
            <img
              src={Logo}
              alt="Logo Large"
              className="brand-image elevation-3"
            />
          </>
          <>
            <i className="fa fa-money"></i>
            My <strong>App</strong>
          </>
        </div>
      </span>
    </a>
    <div className="sidebar">
      <Menu />
    </div>
  </aside>
);

export default SideBar