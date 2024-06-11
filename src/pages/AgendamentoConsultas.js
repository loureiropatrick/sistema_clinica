import './AgendamentoConsultas.css'; // CSS da página
import React, { useEffect ,useState } from 'react'; // Manipulação de estados lógicos
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formulários
import { db } from '../firebaseConfig'; // Firebase Sync
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";  // Firebase CRUD
import InputMask from 'react-input-mask';


const AgendamentoConsultas = () => {

    // Métodos e funções para validar o CPF inserido

    const [cpf, setCpf] = useState(''); // Método que define o valor do CPF, baseado no Input do usuário.
    const [result, setResult] = useState(''); // Método que define e informa o resultado da verificação de cpf, se é válido ou inválido.

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

    // Não estamos mais utilizando o evento de lidar com o envio pois removemos o botão de enviar.
    const handleSubmit = (event) => {
      event.preventDefault();
      if (validateCPF(cpf)) {
        setResult('CPF válido!');
      } else {
        setResult('CPF inválido!');
      }
    };

    // Métodos e funções para a query no firebase


    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const q = query(collection(db, "pacientes"), where("cpf", "==", cpf));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            setUserData(querySnapshot.docs[0].data());
          } else {
            setUserData('');
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
  
    const handleChange = (e) => 
    {

        const value = e.target.value;
        setCpf(value);

        if (value.length === 14) { // 14 caracteres inclui os pontos e o hífen da máscara

          setResult(validateCPF(value) ? 'CPF válido!' : 'CPF inválido!');

        } 
        
        else 

        {
          setResult('');
        }

    };




    // Estrutura da página

    return (
        <div className = "main">

        <div className = "title">
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
      <p className={result === 'CPF válido!' ? 'valid' : 'invalid'}>{result}</p>
    </div>


        <Formik>

                    <Form>

                        <div className="form-body-container">
                            <h3 className="form-section-title">Dados pessoais</h3>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Nome civil</label>
                                    <Field 
                                     type="text"
                                     name="nome"
                                     onChange = {handleInputChange}
                                     value = {userData ? userData.nome : ''}
                                     readOnly
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Sexo</label>
                                    <Field 
                                    name="sexo"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.sexo : ''}
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nome social</label>
                                    <Field 
                                    type="text"
                                    name="nomeSocial"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.nomeSocial : ''}
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Raça</label>
                                    <Field 
                                    name="raca"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.raca : ''} 
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CPF</label>
                                    <Field 
                                    name="cpf"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.cpf : ''} 
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Profissão</label>
                                    <Field 
                                    type="text" 
                                    name="profissao"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.profissao : ''}
                                    readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-body-container">
                            <h3 className="form-section-title">Formas de contato</h3>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field 
                                    type="email" 
                                    name="email"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.email : ''}
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Celular</label>
                                    <Field 
                                    name="celular"
                                    onChange = {handleInputChange}
                                    value = {userData ? userData.celular : ''} 
                                    readOnly
                                    />
                                </div>
                            </div>
                        </div>

                    </Form>

            </Formik>


            <div className = "title" style = {{ marginTop: '50px' }}>
            <h2>Etapa 2</h2>
            <p>Preencha o formulário abaixo e oficialize o agendamento clicando em confirmar</p>
            </div>
      
    
        </div>
    );
};

export default AgendamentoConsultas;
