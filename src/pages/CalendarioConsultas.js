import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import './CalendarioConsultas.css'; // Importe o arquivo CSS

const CalendarioConsultas = () => {
    const [data, setData] = useState(''); // Método que define o valor da data escolhida pelo usuário.
    const [consultas, setConsultas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Função para formatar a data de yyyy-mm-dd para dd/mm/yyyy
    const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
    };


    // Função para buscar consultas do Firebase
    const fetchConsultas = async () => {
        const consultasCollection = collection(db, "consultasAgendadas");
        const querySnapshot = await getDocs(consultasCollection);
        const consultasList = querySnapshot.docs.map(doc => doc.data());
        setConsultas(consultasList);
    };

    useEffect(() => {
        fetchConsultas();
    }, [data]); // Refazer a consulta, toda vez que o campo data inserido pelo usuário for modificado.

    // Calcule as consultas a serem exibidas na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem);

    // Determine o número de páginas
    const totalPages = Math.ceil(consultas.length / itemsPerPage);

    // Handlers para navegação de página
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
                                <td>{consulta.telefone}</td>
                                <td>{consulta.motivo}</td>
                                <td>{consulta.formaPagamento}</td>
                                <td><button>Confirmar</button></td>
                                <td><button>Alterar</button></td>
                                <td><button>Deletar</button></td>
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
