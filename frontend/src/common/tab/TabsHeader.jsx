import React from "react";

function TabsHeader({ children }) {
  return (
      <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
        {children}
      </ul>
  );
}

export default TabsHeader;
