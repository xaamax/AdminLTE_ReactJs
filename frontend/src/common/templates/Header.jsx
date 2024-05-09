import React from "react";
import Gravatar from "react-gravatar";

function Header() {
  const { nome, email } = JSON.parse(localStorage.getItem("userData"));

  return (
    <header>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/home" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown user user-menu">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              <Gravatar
                email={email}
                className="user-image img-circle elevation-2"
              />
              <span className="hidden-xs d-none d-sm-inline-block">{nome}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <li className="user-header">
                <Gravatar
                  email={email}
                  className="img-circle elevation-2"
                />
                <p>
                  {nome}
                  <small>{email}</small>
                </p>
              </li>
              <li className="user-footer d-flex">
                <div className="mr-auto">
                  <a className="btn btn-default" role="button">
                    <i className="fas fa-cogs"></i>Configurações
                  </a>
                </div>
                <div>
                  <a className="btn btn-default" role="button">
                    <i className="fas fa-sign-out-alt"></i>Logout
                  </a>
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
