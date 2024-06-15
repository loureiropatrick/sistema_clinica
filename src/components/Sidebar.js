import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaCalendarAlt, FaStethoscope, FaHistory, FaUserMd, FaDollarSign } from 'react-icons/fa';
import './Sidebar.css';
import logo from '../images/logo_+Saude.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
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
                <hr className="sidebar-divider"></hr>
                <li>
                    <Link to="/home/agendamento-consultas">
                        <FaCalendarAlt className="sidebar-icon" />
                        {isOpen && <span>Agendamento de Consultas</span>}
                    </Link>
                </li>
                <hr className="sidebar-divider"></hr>
                <li>
                    <Link to="/home/calendario-consultas">
                        <FaCalendarAlt className="sidebar-icon" />
                        {isOpen && <span>Calendário de Consultas</span>}
                    </Link>
                </li>
                <hr className="sidebar-divider"></hr>
                <li>
                    <Link to="/home/consulta-medica">
                        <FaStethoscope className="sidebar-icon" />
                        {isOpen && <span>Consulta Médica</span>}
                    </Link>
                </li>
                <hr className="sidebar-divider"></hr>
                <li>
                    <Link to="/home/historico-paciente">
                        <FaHistory className="sidebar-icon" />
                        {isOpen && <span>Histórico do Paciente</span>}
                    </Link>
                </li>
                <hr className="sidebar-divider"></hr>
                <li>
                    <Link to="/home/cadastro-usuarios">
                        <FaUserMd className="sidebar-icon" />
                        {isOpen && <span>Cadastro de Atendentes ou Médicos</span>}
                    </Link>
                </li>
                <hr className="sidebar-divider"></hr>
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





