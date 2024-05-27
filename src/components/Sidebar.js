import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/home/cadastro-pacientes">Cadastro de Pacientes</Link></li>
                <li><Link to="/home/agendamento-consultas">Agendamento de Consultas</Link></li>
                <li><Link to="/home/calendario-consultas">Calendário de Consultas</Link></li>
                <li><Link to="/home/consulta-medica">Consulta Médica</Link></li>
                <li><Link to="/home/historico-paciente">Histórico do Paciente</Link></li>
                <li><Link to="/home/cadastro-usuarios">Cadastro de Atendentes ou Médicos</Link></li>
                <li><Link to="/home/receita-servicos">Receita dos Serviços Prestados</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
