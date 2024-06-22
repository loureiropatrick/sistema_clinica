// src/App.js

import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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
import ResetPassword from './components/ResetPassword';
import DadosPessoais from './components/DadosPessoais';
import AlterarSenha from './components/AlterarSenha';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tipoFuncionario, setTipoFuncionario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, 'funcionarios', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const tipo = data.tipoFuncionario;
                        console.log("Tipo de funcionário obtido do Firebase: ", tipo);
                        setTipoFuncionario(tipo);
                        setIsAuthenticated(true);
                    } else {
                        console.log("Documento não encontrado!");
                        setTipoFuncionario(null);
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Erro ao buscar documento: ", error);
                    setTipoFuncionario(null);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
                setTipoFuncionario(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        setTipoFuncionario(user.tipoFuncionario);
    };

    const renderRoutes = () => {
        if (loading) {
            return <div>Carregando...</div>;
        }

        if (!isAuthenticated) {
            return (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            );
        }

        if (!tipoFuncionario) {
            return <div>Tipo de funcionário não reconhecido.</div>;
        }

        switch (tipoFuncionario) {
            case 'admin':
                return (
                    <Routes>
                        <Route path="/" element={<CadastroPacientes />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home/*" element={<Home tipoFuncionario={tipoFuncionario} />} />
                        <Route path="/dados-pessoais" element={<DadosPessoais />} />
                        <Route path="/alterar-senha" element={<AlterarSenha />} />
                    </Routes>
                );
            case 'atendente':
                return (
                    <Routes>
                        <Route path="/" element={<CadastroPacientes />} />
                        <Route path="/home/*" element={<Home tipoFuncionario={tipoFuncionario} />} />
                        <Route path="/dados-pessoais" element={<DadosPessoais />} />
                        <Route path="/alterar-senha" element={<AlterarSenha />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                );
            case 'medico':
                return (
                    <Routes>
                        <Route path="/" element={<CalendarioConsultas />} />
                        <Route path="/home/*" element={<Home tipoFuncionario={tipoFuncionario} />} />
                        <Route path="/dados-pessoais" element={<DadosPessoais />} />
                        <Route path="/alterar-senha" element={<AlterarSenha />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                );
            default:
                console.log("Tipo de funcionário não reconhecido: ", tipoFuncionario);
                return <div>Tipo de funcionário não reconhecido.</div>;
        }
    };

    return (
        <div className="App">
            {isAuthenticated && tipoFuncionario ? (
                <>
                    <Header toggleSidebar={toggleSidebar} />
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} tipoFuncionario={tipoFuncionario} />
                    <div className="content">
                        {renderRoutes()}
                    </div>
                </>
            ) : (
                renderRoutes()
            )}
        </div>
    );
};

const Home = ({ tipoFuncionario }) => {
    const renderRoutes = () => {
        switch (tipoFuncionario) {
            case 'admin':
                return (
                    <>
                        <Route path="cadastro-pacientes" element={<CadastroPacientes />} />
                        <Route path="agendamento-consultas" element={<AgendamentoConsultas />} />
                        <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                        <Route path="consulta-medica" element={<ConsultaMedica />} />
                        <Route path="historico-paciente" element={<HistoricoPaciente />} />
                        <Route path="cadastro-usuarios" element={<CadastroUsuarios />} />
                        <Route path="receita-servicos" element={<ReceitaServicos />} />
                    </>
                );
            case 'atendente':
                return (
                    <>
                        <Route path="cadastro-pacientes" element={<CadastroPacientes />} />
                        <Route path="agendamento-consultas" element={<AgendamentoConsultas />} />
                        <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                    </>
                );
            case 'medico':
                return (
                    <>
                        <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                        <Route path="consulta-medica" element={<ConsultaMedica />} />
                        <Route path="historico-paciente" element={<HistoricoPaciente />} />
                    </>
                );
            default:
                console.log("Tipo de funcionário não reconhecido no Home: ", tipoFuncionario);
                return <div>Tipo de funcionário não reconhecido no Home.</div>;
        }
    };

    return (
        <div className="home">
            <Routes>
                {renderRoutes()}
            </Routes>
        </div>
    );
};

export default App;