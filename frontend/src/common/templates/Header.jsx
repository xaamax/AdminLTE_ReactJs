import React, { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { userData } from "../constants";

function Header({ handleDarkMode, darkMode }) {
  
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    setUsuario(userData)
  },[])

  return (
    <header>
      <nav
        className={`main-header navbar navbar-expand navbar-light ${
          darkMode ? "bg-dark" : ""
        }`}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className={`nav-link ${darkMode ? "text-white" : ""}`}
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className={`nav-link ${darkMode ? "text-white" : ""}`}>
              Home
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li
            className="nav-item"
            style={{ cursor: "pointer" }}
            onClick={handleDarkMode}
          >
            <span className={`nav-link ${darkMode ? "text-white" : ""}`}>
              <i className={`fas fa-${darkMode ? "moon" : "sun"} fa-lg`}></i>
            </span>
          </li>
          <li className="nav-item dropdown user user-menu">
            <a
              href="#"
              className={`nav-link dropdown-toggle ${
                darkMode ? "text-white" : ""
              }`}
              data-toggle="dropdown"
            >
              <Gravatar
                email={usuario.email || ""}
                className="user-image img-circle elevation-2"
              />
              <span className="hidden-xs d-none d-sm-inline-block">{usuario.nome}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <li className="user-header">
                <Gravatar email={usuario.email || ""} className="img-circle elevation-2" />
                <p>
                  {usuario.nome}
                  <small>{usuario.email}</small>
                </p>
              </li>
              <li className="user-footer">
                <div className="d-flex justify-content-betweeen">
                  <div>
                    <a
                      href="/config"
                      className="btn btn-default btn-flat"
                      role="button"
                    >
                      <i className="fas fa-cogs mr-2"></i>Configurações
                    </a>
                  </div>
                  <div>
                    <a className="btn btn-default btn-flat" role="button">
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
