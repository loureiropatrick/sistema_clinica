// src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ResetPassword from './components/ResetPassword';
import DadosPessoais from './components/DadosPessoais';
import AlterarSenha from './components/AlterarSenha';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tipoFuncionario, setTipoFuncionario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const savedTipoFuncionario = localStorage.getItem('tipoFuncionario');

        if (savedIsAuthenticated && savedTipoFuncionario) {
            setIsAuthenticated(true);
            setTipoFuncionario(savedTipoFuncionario);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

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
                        localStorage.setItem('isAuthenticated', 'true');
                        localStorage.setItem('tipoFuncionario', tipo);
                    } else {
                        console.log("Documento não encontrado!");
                        setTipoFuncionario(null);
                        setIsAuthenticated(false);
                        localStorage.removeItem('isAuthenticated');
                        localStorage.removeItem('tipoFuncionario');
                    }
                } catch (error) {
                    console.error("Erro ao buscar documento: ", error);
                    setTipoFuncionario(null);
                    setIsAuthenticated(false);
                    localStorage.removeItem('isAuthenticated');
                    localStorage.removeItem('tipoFuncionario');
                }
            } else {
                setIsAuthenticated(false);
                setTipoFuncionario(null);
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('tipoFuncionario');
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
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('tipoFuncionario', user.tipoFuncionario);
    };

    const renderRoutes = () => {
        if (loading) {
            return <div>Carregando...</div>;
        }

        return (
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path="/" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route
                            path="/home/*"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <HomePage tipoFuncionario={tipoFuncionario} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dados-pessoais"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <DadosPessoais />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/alterar-senha"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AlterarSenha />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/home" />} />
                    </>
                )}
            </Routes>
        );
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

// Renomeando o componente Home para HomePage
const HomePage = ({ tipoFuncionario }) => {
    const renderRoutes = () => {
        switch (tipoFuncionario) {
            case 'admin':
                return (
                    <Routes>
                        <Route path="cadastro-pacientes" element={<CadastroPacientes />} />
                        <Route path="agendamento-consultas" element={<AgendamentoConsultas />} />
                        <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                        <Route path="consulta-medica" element={<ConsultaMedica />} />
                        <Route path="historico-paciente" element={<HistoricoPaciente />} />
                        <Route path="cadastro-usuarios" element={<CadastroUsuarios />} />
                        <Route path="receita-servicos" element={<ReceitaServicos />} />
                    </Routes>
                );
            case 'atendente':
                return (
                    <Routes>
                        <Route path="cadastro-pacientes" element={<CadastroPacientes />} />
                        <Route path="agendamento-consultas" element={<AgendamentoConsultas />} />
                        <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                    </Routes>
                );
            case 'medico':
                return (
                    <Routes>
                        <Route path="calendario-consultas" element={<CalendarioConsultas />} />
                        <Route path="consulta-medica" element={<ConsultaMedica />} />
                        <Route path="historico-paciente" element={<HistoricoPaciente />} />
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

export default App;





