import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.css';
import userPlaceholder from '../assets/user-placeholder.png';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="header">
            <FaBars className="menu-icon" onClick={toggleSidebar} />
            <div className="user-info">
                <img src={userPlaceholder} alt="Usuário" />
                <span>Dr. Nome do Médico</span>
            </div>
        </header>
    );
};

export default Header;


