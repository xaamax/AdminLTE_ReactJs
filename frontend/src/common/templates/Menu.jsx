import React, { Children } from "react";
import MenuItem from "./MenuItem";
import MenuTree from "./MenuTree";

const Menu = () => {
  const itemsMenus = JSON.parse(localStorage.getItem("menuData"));

  const MenuData = ({ header, items }) => (
    <>
      <li className="nav-header">{header}</li>
      {items.map(({ label, icon, childrens }, idx) => {
        return (
          <React.Fragment key={idx}>
          {childrens && (
            <MenuTree label={label} icon={icon}>
              {childrens.map(({ label, icon }, i) => (
                <MenuItem key={i} label={label} icon={icon} />
              ))}
            </MenuTree>
          )}
          {!childrens && <MenuItem label={label} icon={icon} />}
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
