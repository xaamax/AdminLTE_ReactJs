import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, label }) => {
  return (
    <li className='nav-item'>
      <Link to='/' className='nav-link'>
          <i className={`nav-icon fas fa-${icon} mr-2`}></i>
          <p>{label}</p>
      </Link>
    </li>
  );
};

export default MenuItem;
