// src/pages/ConsultaMedica.js
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import './ConsultaMedica.css';

const ConsultaMedica = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    altura: '',
    peso: '',
    sexo: '',
    queixa: '',
    doencas: '',
    historicoFamiliar: '',
    medicamentos: '',
    cirurgias: '',
    fuma: '',
    bebe: '',
    atividadeFisica: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "consultasMedicas"), formData);
      alert("Consulta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar consulta: ", error);
      alert("Erro ao salvar consulta");
    }
  };

  return (
    <div className="consulta-medica-container">
      <form className="consulta-medica-form" onSubmit={handleSubmit}>
        <h2>Consulta Médica</h2>
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input type="date" name="dataNascimento" placeholder="Data de Nascimento" onChange={handleChange} required />
        <input type="text" name="altura" placeholder="Altura" onChange={handleChange} required />
        <input type="text" name="peso" placeholder="Peso" onChange={handleChange} required />
        <select name="sexo" onChange={handleChange} required>
          <option value="">Sexo</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        <textarea name="queixa" placeholder="Qual a queixa principal para ter vindo no consultório?" onChange={handleChange} required></textarea>
        <textarea name="doencas" placeholder="Já teve alguma doença?" onChange={handleChange} required></textarea>
        <textarea name="historicoFamiliar" placeholder="Histórico de doença familiar?" onChange={handleChange} required></textarea>
        <textarea name="medicamentos" placeholder="Faz uso de medicamentos contínuo?" onChange={handleChange} required></textarea>
        <textarea name="cirurgias" placeholder="Fez alguma cirurgia?" onChange={handleChange} required></textarea>
        <select name="fuma" onChange={handleChange} required>
          <option value="">Fuma?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
        <select name="bebe" onChange={handleChange} required>
          <option value="">Bebe?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
        <textarea name="atividadeFisica" placeholder="Faz alguma atividade física?" onChange={handleChange} required></textarea>
        <button type="submit">Salvar Consulta</button>
      </form>
    </div>
  );
};

export default ConsultaMedica;
