// src/pages/Home.js
import React from 'react';
import './Home.css';

const Home = ({ tipoFuncionario }) => {
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
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Sistema de Clínica</h1>
      {renderRoutes()}
    </div>
  );
};

export default Home;
