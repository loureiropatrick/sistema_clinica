import React from 'react';
import '../App.css';
import userPlaceholder from '../assets/user-placeholder.png';
import logo from '../assets/logo2.png'; // Importe a logo


const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="Logo da Clínica" className="header-logo" />

            <div className="user-info">
                <img src={userPlaceholder} alt="Usuário" />
                <span>Dr. Nome do Médico</span>
            </div>
        </header>

    );
};

export default Header;
