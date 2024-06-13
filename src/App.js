import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CadastroPacientes from './pages/CadastroPacientes';
import AgendamentoConsultas from './pages/AgendamentoConsultas';
import CalendarioConsultas from './pages/CalendarioConsultas';
import ConsultaMedica from './pages/ConsultaMedica';
import HistoricoPaciente from './pages/HistoricoPaciente';
import CadastroUsuarios from './pages/CadastroUsuarios';
import ReceitaServicos from './pages/ReceitaServicos';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home/*" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
};

const Home = () => {
    return (
        <div className="home">
            <Header />
            <Sidebar />
            <div className="content">
                <Routes>
                    <Route path="cadastro-pacientes" element={<CadastroPacientes />} />
                    <Route path="agendamento-consultas" element={<AgendamentoConsultas />} />
                    <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                    <Route path="consulta-medica" element={<ConsultaMedica />} />
                    <Route path="historico-paciente" element={<HistoricoPaciente />} />
                    <Route path="cadastro-usuarios" element={<CadastroUsuarios />} />
                    <Route path="receita-servicos" element={<ReceitaServicos />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

const Footer = () => {
    return (
        <footer>
            <p>© Copyright MedCenter. All Rights Reserved</p>
            <p>Designed by MedCenter</p>
        </footer>
    );
};

export default App;
