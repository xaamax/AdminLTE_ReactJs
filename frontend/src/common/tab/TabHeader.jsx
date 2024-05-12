import React from "react";

function TabHeader({ label, icon, target, active, handleTabSelect }) {
  return (
    <li className="nav-item">
      <a
        className={`nav-link ${active ? "active" : ""}`}
        data-toggle="pill"
        href={`#${target}`}
        role="tab"
        aria-selected="true"
        onClick={() => handleTabSelect(target)}
      >
        <i className={`fa fa-${icon}`}></i> {label}
      </a>
    </li>
  );
}

export default TabHeader;
