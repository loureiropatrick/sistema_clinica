import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import './CalendarioConsultas.css'; // Importe o arquivo CSS

const CalendarioConsultas = () => {
    const [data, setData] = useState('');
    const [consultas, setConsultas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [confirmacaoSelecionada, setConfirmacaoSelecionada] = useState('');

    const fetchConsultas = async () => {
        const consultasCollection = collection(db, "consultasAgendadas");
        const querySnapshot = await getDocs(consultasCollection);
        const consultasList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setConsultas(consultasList);
    };

    useEffect(() => {
        fetchConsultas();
    }, [data]);

    const formatarData = (data) => {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const handleDeleteConsulta = async (id) => {
        // Perguntar ao usuário se ele tem certeza
        const confirmDelete = window.confirm("Tem certeza que deseja deletar esta consulta?");
        
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "consultasAgendadas", id));
                fetchConsultas(); // Atualiza a lista de consultas após a exclusão
            } catch (error) {
                console.error("Erro ao deletar consulta:", error);
            }
        }
    };

    const updateConfirmacao = async (id, confirmada) => {
        try {
            const consultaRef = doc(db, "consultasAgendadas", id);
            await updateDoc(consultaRef, {
                confirmacao: confirmada
            });
            fetchConsultas(); // Atualiza a lista de consultas após a atualização
        } catch (error) {
            console.error("Erro ao atualizar confirmação:", error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(consultas.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>Motivo</th>
                            <th>Forma de Pagamento</th>
                            <th>Confirmar</th>
                            <th>Alterar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((consulta, index) => (
                            <tr key={index}>
                                <td>{formatarData(consulta.data)}</td>
                                <td>{consulta.hora}</td>
                                <td>{consulta.nome}</td>
                                <td>{consulta.cpfConsulta}</td>
                                <td>{consulta.telefone}</td>
                                <td>{consulta.motivo}</td>
                                <td>{consulta.formaPagamento}</td>
                                <td>
                                    <select
                                        name="Confirmação"
                                        value={consulta.confirmação}
                                        onChange={(e) => {
                                            setConfirmacaoSelecionada(e.target.value);
                                            if (e.target.value === "True") {
                                                updateConfirmacao(consulta.id, true); // Aqui estava 'consulta.confirmação' corrigi para 'consulta.id'
                                            }
                                        }}
                                        required
                                    >
                                        <option value="True">Confirmada</option>
                                        <option value="False">Não Confirmada</option>
                                    </select>
                                </td>
                                <td><button>Alterar</button></td>
                                <td><button onClick={() => handleDeleteConsulta(consulta.id)}>Deletar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                    <span>{currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarioConsultas;
