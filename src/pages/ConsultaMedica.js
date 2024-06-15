// src/pages/ConsultaMedica.js
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import InputMask from 'react-input-mask';
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
    const { name, value } = e.target;
    if (name === 'nome') {
      if (typeof value === 'string') {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === 'cpf') {
      if (/^\d{11}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === 'altura' || name === 'peso') {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setFormData({ ...formData, [name]: floatValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    <div className="container">
      <form className="consulta-medica-form" onSubmit={handleSubmit}>
        <h2 className="form-header">Consulta Médica</h2>
        <div className="form-body">
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" name="nome" placeholder="Preencha o nome do paciente" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>CPF</label>
              <input type="text" name="cpf"  onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input type="date" name="dataNascimento" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Altura</label>
              <input type="text" name="altura" onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Peso</label>
              <input type="text" name="peso" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select name="sexo" onChange={handleChange} required>
                <option value="">Sexo</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Queixa</label>
              <textarea name="queixa" placeholder="Pergunte quais sintomas o paciente está sentindo" onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Doenças</label>
              <textarea name="doencas" placeholder="Verifique se o paciente têm alguma doença" onChange={handleChange} required></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Histórico Familiar</label>
              <textarea name="historicoFamiliar" placeholder="Pergunte se o paciente contém algum histórico familiar grave, como câncer, diabetes, etc" onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Medicamentos</label>
              <textarea name="medicamentos" placeholder="Verifique se o paciente faz uso de algum medicamento contínuo" onChange={handleChange} required></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Cirurgias</label>
              <textarea name="cirurgias" placeholder="Pergunte se o paciente já fez alguma cirurgia" onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Fuma?</label>
              <select name="fuma" onChange={handleChange} required>
                <option value="">Fuma?</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Bebe?</label>
              <select name="bebe" onChange={handleChange} required>
                <option value="">Bebe?</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            <div className="form-group">
              <label>Atividade Física</label>
              <textarea name="atividadeFisica" placeholder="Pergunte se o paciente pratica alguma atividade física "onChange={handleChange} required></textarea>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">Salvar Consulta</button>
        </div>
      </form>
    </div>
  );
};

export default ConsultaMedica;
