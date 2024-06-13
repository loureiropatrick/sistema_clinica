import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './HistoricoPaciente.css';

const HistoricoPaciente = () => {
    const [cpf, setCpf] = useState('');
    const [historico, setHistorico] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const q = query(collection(db, 'consultas'), where('cpf', '==', cpf));
        const querySnapshot = await getDocs(q);
        const historicoArray = [];
        querySnapshot.forEach((doc) => {
            historicoArray.push({ id: doc.id, ...doc.data() });
        });
        setHistorico(historicoArray);
    };

    const handleSelectConsulta = (consulta) => {
        setSelectedConsulta(consulta);
    };

    return (
        <div className="historico-paciente">
            <h2>Histórico do Paciente</h2>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label>CPF do Paciente:</label>
                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                </div>
                <button type="submit">Buscar</button>
            </form>
            {historico.length > 0 && (
                <div className="historico-lista">
                    <h3>Consultas Anteriores</h3>
                    <ul>
                        {historico.map((consulta) => (
                            <li key={consulta.id} onClick={() => handleSelectConsulta(consulta)}>
                                <span>{consulta.dataNascimento}</span> - <span>{consulta.queixaPrincipal}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedConsulta && (
                <div className="consulta-detalhes">
                    <h3>Detalhes da Consulta</h3>
                    <p>Nome: {selectedConsulta.nome}</p>
                    <p>CPF: {selectedConsulta.cpf}</p>
                    <p>Data de Nascimento: {selectedConsulta.dataNascimento}</p>
                    <p>Altura: {selectedConsulta.altura}</p>
                    <p>Peso: {selectedConsulta.peso}</p>
                    <p>Sexo: {selectedConsulta.sexo}</p>
                    <p>Queixa Principal: {selectedConsulta.queixaPrincipal}</p>
                    <p>Doenças: {selectedConsulta.doencas}</p>
                    <p>Histórico Familiar: {selectedConsulta.historicoFamiliar}</p>
                    <p>Medicamentos: {selectedConsulta.medicamentos}</p>
                    <p>Cirurgias: {selectedConsulta.cirurgias}</p>
                    <p>Fuma: {selectedConsulta.fuma}</p>
                    <p>Bebe: {selectedConsulta.bebe}</p>
                    <p>Atividade Física: {selectedConsulta.atividadeFisica}</p>
                </div>
            )}
        </div>
    );
};

export default HistoricoPaciente;
