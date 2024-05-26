import React from 'react';

const MenuItem = ({ icon, label, path }) => {
  return (
    <li className='nav-item'>
      <a href={path} className='nav-link'>
          <i className={`nav-icon fas fa-${icon} mr-2`}></i>
          <p>{label}</p>
      </a>
    </li>
  );
};

export default MenuItem;
