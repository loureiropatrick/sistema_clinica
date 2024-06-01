import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaCalendarAlt, FaStethoscope, FaHistory, FaUserMd, FaDollarSign } from 'react-icons/fa';
import '../App.css';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
                <img src={logo} alt="Logo" className="sidebar-logo" />
            </button>
            <ul>
                <li>
                    <Link to="/home/cadastro-pacientes">
                        <FaUserPlus className="sidebar-icon" />
                        {isOpen && <span>Cadastro de Pacientes</span>}
                    </Link>
                </li>
                <hr class="sidebar-divider"></hr>
                <li>
                    <Link to="/home/agendamento-consultas">
                        <FaCalendarAlt className="sidebar-icon" />
                        {isOpen && <span>Agendamento de Consultas</span>}
                    </Link>
                </li>
                <hr class="sidebar-divider"></hr>
                <li>
                    <Link to="/home/calendario-consultas">
                        <FaCalendarAlt className="sidebar-icon" />
                        {isOpen && <span>Calendário de Consultas</span>}
                    </Link>
                </li>
                <hr class="sidebar-divider"></hr>
                <li>
                    <Link to="/home/consulta-medica">
                        <FaStethoscope className="sidebar-icon" />
                        {isOpen && <span>Consulta Médica</span>}
                    </Link>
                </li>
                <hr class="sidebar-divider"></hr>
                <li>
                    <Link to="/home/historico-paciente">
                        <FaHistory className="sidebar-icon" />
                        {isOpen && <span>Histórico do Paciente</span>}
                    </Link>
                </li>
                <hr class="sidebar-divider"></hr>
                <li>
                    <Link to="/home/cadastro-usuarios">
                        <FaUserMd className="sidebar-icon" />
                        {isOpen && <span>Cadastro de Atendentes ou Médicos</span>}
                    </Link>
                </li>
                <hr class="sidebar-divider"></hr>
                <li>
                    <Link to="/home/receita-servicos">
                        <FaDollarSign className="sidebar-icon" />
                        {isOpen && <span>Receita dos Serviços Prestados</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
