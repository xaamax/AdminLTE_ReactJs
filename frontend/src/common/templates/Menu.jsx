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
      {items.filter(({ visible }) => visible).map(({ label, icon, route, childrens }, idx) => {
        return (
          <React.Fragment key={idx}>
          {childrens.length > 0 && (
            <MenuTree label={label} icon={icon} path={route} >
              {childrens.filter(({ visible }) => visible).map(({ label, icon, route }, i) => (
                <MenuItem key={i} {...{ label, icon, route }} />
              ))}
            </MenuTree>
          )}
          {!childrens.length && <MenuItem {...{label, icon, route }} />}
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
