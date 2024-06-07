import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp'; // Corrigir o nome do componente SignUp
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
                    <Route path="/signup" element={<SignUp />} /> {/* Corrigir o nome do componente SignUp */}
                    <Route path="/home/*" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
};

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`home ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Header />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
            <p>© Copyright +Saúde. All Rights Reserved</p>
            <p>Designed by +Saúde</p>
        </footer>
    );
};

export default App;


