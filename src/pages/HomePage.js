// src/pages/HomePage.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroPacientes from './CadastroPacientes';
import AgendamentoConsultas from './AgendamentoConsultas';
import CalendarioConsultas from './CalendarioConsultas';
import ConsultaMedica from './ConsultaMedica';
import HistoricoPaciente from './HistoricoPaciente';
import CadastroUsuarios from './CadastroUsuarios';
import ReceitaServicos from './ReceitaServicos';
import Home from './home';
import './HomePage.css';

const HomePage = ({ tipoFuncionario }) => {
    const renderRoutes = () => {
        switch (tipoFuncionario) {
            case 'admin':
                return (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastro-pacientes" element={<CadastroPacientes />} />
                        <Route path="/agendamento-consultas" element={<AgendamentoConsultas />} />
                        <Route path="/calendario-consultas" element={<CalendarioConsultas />} />
                        <Route path="/consulta-medica" element={<ConsultaMedica />} />
                        <Route path="/historico-paciente" element={<HistoricoPaciente />} />
                        <Route path="/cadastro-usuarios" element={<CadastroUsuarios />} />
                        <Route path="/receita-servicos" element={<ReceitaServicos />} />
                    </Routes>
                );
            case 'atendente':
                return (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cadastro-pacientes" element={<CadastroPacientes />} />
                        <Route path="/agendamento-consultas" element={<AgendamentoConsultas />} />
                        <Route path="/calendario-consultas" element={<CalendarioConsultas />} />
                    </Routes>
                );
            case 'medico':
                return (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendario-consultas" element={<CalendarioConsultas />} />
                        <Route path="/consulta-medica" element={<ConsultaMedica />} />
                        <Route path="/historico-paciente" element={<HistoricoPaciente />} />
                    </Routes>
                );
            default:
                console.log("Tipo de funcionário não reconhecido no Home: ", tipoFuncionario);
                return <div>Tipo de funcionário não reconhecido no Home.</div>;
        }
    };

    return (
        <div className="home">
            {renderRoutes()}
        </div>
    );
};

export default HomePage;
