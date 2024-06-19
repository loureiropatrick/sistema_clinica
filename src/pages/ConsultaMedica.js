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
    atividadeFisica: '',
    especialidadeMedica: ''  // novo campo para especialidade médica
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const renderCamposEspecialidade = (especialidade) => {
    switch (especialidade) {
      case 'cardiologia':
        return (
          <>
            <div className="form-group">
              <label>Pressão Arterial</label>
              <input type="text" name="pressaoArterial" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Historial Cardíaco</label>
              <textarea name="historialCardiaco" onChange={handleChange} required></textarea>
            </div>
          </>
        );
      case 'dermatologia':
        return (
          <>
            <div className="form-group">
              <label>Problemas de Pele</label>
              <textarea name="problemasPele" onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Tratamentos Anteriores</label>
              <textarea name="tratamentosAnteriores" onChange={handleChange} required></textarea>
            </div>
          </>
        );
      case 'ortopedia':
        return (
          <>
            <div className="form-group">
              <label>Lesões Ósseas</label>
              <textarea name="lesoesOsseas" onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Cirurgias Ortopédicas</label>
              <textarea name="cirurgiasOrtopedicas" onChange={handleChange} required></textarea>
            </div>
          </>
        );
      default:
        return null;
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
              <input type="text" name="cpf" onChange={handleChange} required />
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
              <label>Especialidade Médica</label>
              <select name="especialidadeMedica" onChange={handleChange} required>
                <option value="">Selecione a especialidade médica</option>
                <option value="cardiologia">Cardiologia</option>
                <option value="dermatologia">Dermatologia</option>
                <option value="ortopedia">Ortopedia</option>
                {/* Adicione outras especialidades conforme necessário */}
              </select>
            </div>
          </div>

          {/* Renderização condicional dos campos baseados na especialidade selecionada */}
          {formData.especialidadeMedica && (
            <div className="form-row">
              {renderCamposEspecialidade(formData.especialidadeMedica)}
            </div>
          )}

        </div>
        <div className="btn-container">
          <button type="submit" className="btn">Salvar Consulta</button>
        </div>
      </form>
    </div>
  );
};

export default ConsultaMedica;
