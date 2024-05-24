import React from 'react';

const MenuItem = ({ icon, label, route }) => {
  return (
    <li className='nav-item'>
      <a href={route} className='nav-link'>
          <i className={`nav-icon fas fa-${icon} mr-2`}></i>
          <p>{label}</p>
      </a>
    </li>
  );
};

export default MenuItem;
