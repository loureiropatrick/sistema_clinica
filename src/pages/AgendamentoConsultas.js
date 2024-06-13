import './AgendamentoConsultas.css'; // CSS da página
import React, { useEffect, useState } from 'react'; // Manipulação de estados lógicos
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formulários
import { db } from '../firebaseConfig'; // Firebase Sync
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";  // Firebase CRUD
import InputMask from 'react-input-mask';
import firebase from '../firebaseConfig';

const AgendamentoConsultas = () => {

    // Métodos e funções para validar o CPF inserido
    const [cpf, setCpf] = useState(''); // Método que define o valor do CPF, baseado no Input do usuário.
    const [result, setResult] = useState(''); // Método que define e informa o resultado da verificação de cpf, se é válido ou inválido.
    const [userData, setUserData] = useState(null); // Dados do usuário buscados no Firebase
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro

    const handleInputChange = (e) => {
        setCpf(e.target.value);
    };

    const validateCPF = value => {
        const cpf = value.replace(/[^\d]+/g, '');
        if (cpf === '' || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return false;
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(10))) return false;
        return true;
    };

    // Função para buscar dados do usuário no Firebase
    useEffect(() => {
      const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
          const q = query(collection(db, "pacientes"), where("cpf", "==", cpf));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setUserData(querySnapshot.docs[0].data());
          } else {
            setUserData(null);
            setError("No user data found");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
          setError("Error fetching document");
        } finally {
          setLoading(false);
        }
      };

      if (cpf) {
        fetchUserData();
      }
    }, [cpf]);

    const handleChange = (e) => {
        const value = e.target.value;
        setCpf(value);
        if (value.length === 14) { // 14 caracteres inclui os pontos e o hífen da máscara
          setResult(validateCPF(value) ? 'CPF válido!' : 'CPF inválido!');
        } else {
          setResult('');
        }
    };

    // Formulário para marcar consulta - Etapa 2
    const [cpfConsulta, setCpfconsulta] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [motivo, setMotivo] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar se a data é válida
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zerar as horas, minutos, segundos e milissegundos para a comparação
        const dataConsulta = new Date(data);
        dataConsulta.setHours(0, 0, 0, 0);

        if (dataConsulta < hoje) {
            alert('A data da consulta só é válida se for para um dia futuro.');
            return;
        }

        // Verificar se já existe uma consulta agendada no mesmo horário
        const q = query(collection(db, "consultasAgendadas"), where("data", "==", data), where("hora", "==", hora));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            alert('Já existe uma consulta agendada para este horário.');
            return;
        }

        const consulta = {
          cpfConsulta,
          nome,
          telefone,
          data,
          hora,
          motivo,
          formaPagamento,
          confirmação: false, // Campo "confirmação" adicionado com valor inicial "false"
          preço: null, // Campo "preço" adicionado com valor inicial "null"
        };

        try {
            await addDoc(collection(db, 'consultasAgendadas'), consulta);
            alert('Consulta agendada com sucesso!');
            // Limpar os campos do formulário
            setCpfconsulta('');
            setNome('');
            setTelefone('');
            setData('');
            setHora('');
            setMotivo('');
            setFormaPagamento('');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Erro ao agendar consulta');
        }
    };

    return (
        <div className="main">
            <div className="title">
                <h1>Agendamento de Consultas</h1>
                <h2>Etapa 1</h2>
                <p>Localize o cliente através do CPF e verifique se os dados estão corretos.</p>
            </div>

            <div className="idPaciente">
                <form>
                    <InputMask
                        name="cpf"
                        placeholder="CPF do Cliente"
                        type="text"
                        value={cpf}
                        onChange={handleChange}
                        mask="999.999.999-99"
                        required
                    />
                </form>
                {/*<p className={result === 'CPF válido!' ? 'valid' : 'invalid'}>{result}</p> -- Desativado para não confundir o cliente */}
            </div>

            {userData && (
                <Formik>
                    <Form>
                        <div className="form-body-container">
                            <h3 className="form-section-title">Dados pessoais</h3>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Nome civil</label>
                                    <Field type="text" name="nome" value={userData.nome || ''} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Sexo</label>
                                    <Field name="sexo" value={userData.sexo || ''} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Nome social</label>
                                    <Field type="text" name="nomeSocial" value={userData.nomeSocial || ''} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Raça</label>
                                    <Field name="raca" value={userData.raca || ''} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>CPF</label>
                                    <Field name="cpf" value={userData.cpf || ''} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Profissão</label>
                                    <Field type="text" name="profissao" value={userData.profissao || ''} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-body-container">
                            <h3 className="form-section-title">Formas de contato</h3>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="email" name="email" value={userData.email || ''} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Celular</label>
                                    <Field name="celular" value={userData.celular || ''} readOnly />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            )}

            <div className="title" style={{ marginTop: '50px' }}>
                <h2>Etapa 2</h2>
                <p>Preencha o formulário abaixo e oficialize o agendamento clicando em confirmar</p>
            </div>

            <div className="formConsulta">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>CPF</label>
                        <InputMask
                            type="text"
                            name="cpfConsulta"
                            value={cpfConsulta}
                            onChange={(e) => setCpfconsulta(userData.cpf)}
                            mask="999.999.999-99"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(userData.nome)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Telefone</label>
                        <input
                            type="text"
                            name="Contato"
                            value={telefone}
                            onChange={(e) => setTelefone(userData.celular)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Hora</label>
                        <input
                            type="time"
                            name="hora"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Motivo</label>
                        <textarea
                            name="motivo"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Forma de Pagamento</label>
                        <select
                            name="formaPagamento"
                            value={formaPagamento}
                            onChange={(e) => setFormaPagamento(e.target.value)}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                            <option value="PIX">PIX</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Plano de Saúde">Plano de Saúde</option>
                            <option value="Convênio">Convênio</option>
                        </select>
                    </div>

                    <button type="submit" style = {{ marginTop: '50px', width: '50vw', textAlign: 'center'}}>Confirmar</button>

                </form>

            </div>
        </div>
    );
};

export default AgendamentoConsultas;
