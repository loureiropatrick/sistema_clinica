import React, { useEffect, useState } from 'react'; // Manipulação de estados lógicos
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formulários
import { db } from '../firebaseConfig'; // Firebase Sync
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";  // Firebase CRUD
import InputMask from 'react-input-mask';
import firebase from '../firebaseConfig';
import './CalendarioConsultas.css'; // Importe o arquivo CSS

const CalendarioConsultas = () => {

    const [data, setData] = useState(''); // Método que define o valor da data escolhida pelo usuário.

    return (
        <div className="main">
            <div className="title">
                <h1>Calendário de Consultas</h1>
                <h2>Etapa 1</h2>
                <p>Escolha a data que você deseja verificar quais consultas estão marcadas.</p>
                <div className="form-group">
                    <label></label>
                    <input
                        type="date"
                        name="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="title" style={{ marginTop: '50px' }}>
                <h2>Etapa 2</h2>
                <p>Consulte e interaja com as consultas do dia, da maneira como preferir.</p>
                <table className="tabela1">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Forma de Pagamento</th>
                            <th>Confirmar</th>
                            <th>Alterar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Adicione aqui as linhas das consultas */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CalendarioConsultas;
