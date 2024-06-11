import './AgendamentoConsultas.css'; // CSS da página
import React, { useState } from 'react'; // Manipulação de estados lógicos
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formulários
import InputMask from 'react-input-mask'; // Mascaramento de dados
import { db } from '../firebaseConfig'; // Firebase Sync
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";  // Firebase CRUD

const AgendamentoConsultas = () => {
    return (
        <div className = "main">

        <div className = "title"><h1>Etapa 1</h1></div>

        <div className = "idPaciente">
        <input placeholder = "CPF do Paciente" required></input><button className = "btn" placeholder = "Teste" type = "submit"></button>
        </div>

        <Formik>

                    <Form>

                        <div className="form-body-container">
                            <h3 className="form-section-title">Dados pessoais</h3>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Nome civil</label>
                                    <Field type="text" name="nome" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Sexo</label>
                                    <Field name="sexo" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Nome social</label>
                                    <Field type="text" name="nomeSocial" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Raça</label>
                                    <Field name="raca" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>CPF</label>
                                    <Field name="cpf" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Profissão</label>
                                    <Field type="text" name="profissao" readOnly/>
                                </div>
                            </div>
                        </div>
                        <div className="form-body-container">
                            <h3 className="form-section-title">Formas de contato</h3>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="email" name="email" readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Celular</label>
                                    <Field name="celular" readOnly/>
                                </div>
                            </div>
                        </div>

                    </Form>

            </Formik>


            <div className = "title" style = {{ marginTop: '50px' }}><h1>Etapa 2</h1></div>
      
    
        </div>
    );
};

export default AgendamentoConsultas;
