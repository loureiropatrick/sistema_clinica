import React from 'react';
import '../App.css';
import userPlaceholder from '../assets/user-placeholder.png';

const Header = () => {
    return (
        <header className="header">
            <h1>Nome da Clínica</h1>
            <div className="user-info">
                <img src={userPlaceholder} alt="Usuário" />
                <span>Dr. Nome do Médico</span>
            </div>
        </header>
    );
};

export default Header;
