import React, { Children } from "react";
import MenuItem from "./MenuItem";
import MenuTree from "./MenuTree";

const Menu = () => {
  const itemsMenus = JSON.parse(localStorage.getItem("menuData")) || [];

  const MenuData = ({ header, items }) => (
    <>
      {header && (
        <li className="nav-header">{header}</li>
      )}
      {items.filter(({ visible }) => visible).map(({ label, icon, path, childrens }, idx) => {
        return (
          <React.Fragment key={idx}>
          {childrens.length > 0 && (
            <MenuTree {...{label, icon, path }}>
              {childrens.filter(({ visible }) => visible).map(({ label, icon, path }, i) => (
                <MenuItem key={i} {...{ label, icon, path }} />
              ))}
            </MenuTree>
          )}
          {!childrens.length && <MenuItem {...{label, icon, path }} />}
        </React.Fragment>
        )
      })}
    </>
  );

  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column nav-child-indent"
        data-widget="treeview"
        role="menu"
        collapse="false"
      >
        {itemsMenus.map(({ header, items }, key) => (
          <MenuData key={key} header={header} items={items} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
