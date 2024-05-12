import React from 'react';
import { Link } from 'react-router-dom'

const MenuTree = ({ path, icon, label, children }) => (
    <li className='nav-item'> 
        <Link to={path} className='nav-link'> 
            <i className={`nav-icon fa fa-${icon}`}></i><p>{label}</p>
            <i className='fas fa-angle-left right'></i>
        </Link>
        <ul className='nav nav-treeview'> 
            {children}
        </ul>
    </li>
)

export default MenuTree