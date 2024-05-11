import React from 'react'

const Footer = ({ darkMode }) => (
    <footer className={`main-footer ${darkMode ? 'text-white' : ''}`}> 
        <strong> 
            Copyright &copy; 2024
            <a href='https://github.com/xaamax' target='_blank'> GitHub</a>.
        </strong>
    </footer>
)

export default Footer