import React from 'react';
import { Link } from 'react-router-dom'

const MenuTree = ({ path, icon, label, children }) => (
    <li className='nav-item'> 
        <Link to={path} className='nav-link'> 
            <i className={`nav-icon fas fa-${icon}`}></i><p>{label}
            <i className='nav-icon right fas fa-angle-left'></i>
            </p>
        </Link>
        <ul className='nav nav-treeview'> 
            {children}
        </ul>
    </li>
)

export default MenuTree