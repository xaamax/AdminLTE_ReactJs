import React from 'react';
import MenuItem from './MenuItem';
import MenuTree from './MenuTree';

const Menu = () => {

  const itemsMenus = JSON.parse(localStorage.getItem('menuData'));

  const MenuData = ({ header, text, icon, childrens, num }) => {
    return (
      <>
        <li className='nav-header'>{header}</li>
        {childrens && (
          <MenuTree key={num} label={text} icon={icon}>
            {childrens.map(({ text, icon }, idx) => (
              <MenuItem key={idx} label={`${text} ${idx+1}`} icon={icon} />
            ))}
          </MenuTree>
        )}
        {!childrens && (
            <MenuItem label={text} icon={icon} />
        )}
      </>
    );
  };

  return (
    <nav className='mt-2'>
      <ul
        className='nav nav-pills nav-sidebar flex-column nav-child-indent'
        data-widget='treeview'
        role='menu'
        collapse='false'
      >
        {itemsMenus.map(({ header, text, icon, childrens }, key) => (
          <MenuData
            key={key}
            num={key}
            header={header}
            text={text}
            icon={icon}
            childrens={childrens}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
