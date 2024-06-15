import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="App">
                {isAuthenticated ? (
                    <>
                        <Header toggleSidebar={toggleSidebar} />
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<CadastroPacientes />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/home/*" element={<Home />} />
                            </Routes>
                        </div>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
};

const Home = () => {
    return (
        <div className="home">
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
    );
};

export default App;




