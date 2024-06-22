// src/components/DadosPessoais.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './DadosPessoais.css';

const DadosPessoais = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        celular: '',
        raca: '',
        nomeSocial: '',
        cpf: '',
        matricula: '',
        profilePic: '',
        profissao: '',
        sexo: '',
        tipoFuncionario: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loggedUser = JSON.parse(localStorage.getItem('user'));
                if (loggedUser && loggedUser.id) {
                    const docRef = doc(db, 'funcionarios', loggedUser.id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                        setFormData(docSnap.data());
                    } else {
                        console.error('Documento não encontrado!');
                    }
                } else {
                    console.error('Usuário não encontrado ou ID não está definido!');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user && user.id) {
                const docRef = doc(db, 'funcionarios', user.id);
                await updateDoc(docRef, formData);
                setEditing(false);
                alert('Dados atualizados com sucesso!');
            } else {
                console.error('ID do usuário não está definido!');
            }
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
        }
    };

    return (
        <div className="dados-pessoais-container">
            <h2>Dados Pessoais</h2>
            {loading ? (
                <p>Carregando dados do usuário...</p>
            ) : user ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Celular</label>
                        <input type="text" name="celular" value={formData.celular} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Raça</label>
                        <input type="text" name="raca" value={formData.raca} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Nome Social</label>
                        <input type="text" name="nomeSocial" value={formData.nomeSocial} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>CPF</label>
                        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Matrícula</label>
                        <input type="text" name="matricula" value={formData.matricula} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Profissão</label>
                        <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Sexo</label>
                        <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Tipo de Funcionário</label>
                        <input type="text" name="tipoFuncionario" value={formData.tipoFuncionario} onChange={handleChange} disabled={!editing} />
                    </div>
                    <div>
                        <label>Foto de Perfil</label>
                        {formData.profilePic ? (
                            <img src={formData.profilePic} alt="Foto de Perfil" className="profile-pic" />
                        ) : (
                            <p>Sem foto de perfil</p>
                        )}
                    </div>
                    {editing ? (
                        <button type="submit">Salvar</button>
                    ) : (
                        <button type="button" onClick={() => setEditing(true)}>Editar</button>
                    )}
                </form>
            ) : (
                <p>Usuário não encontrado!</p>
            )}
        </div>
    );
};

export default DadosPessoais;



