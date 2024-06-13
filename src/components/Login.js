import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../App.css';
import logo from '../images/logo_+Saude.png';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === '' || password === '') {
            setError('Todos os campos são obrigatórios');
            setIsError(true);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin(); // Chama a função de callback onLogin após o login bem-sucedido
            navigate('/home');
        } catch (error) {
            setError('Usuário ou senha incorretos');
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleForgotPassword = () => {
        if (email === '') {
            setError('Por favor, insira seu endereço de email');
            setIsError(true);
            return;
        }

        try {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Um email de redefinição de senha foi enviado para o seu endereço de email.');
                })
                .catch((error) => {
                    setError('Ocorreu um erro ao enviar o email de redefinição de senha. Por favor, tente novamente mais tarde.');
                    console.error('Erro ao enviar email de redefinição de senha:', error);
                });
        } catch (error) {
            setError('Ocorreu um erro ao enviar o email de redefinição de senha. Por favor, tente novamente mais tarde.');
            console.error('Erro ao enviar email de redefinição de senha:', error);
        }
    };

    const handleInputChange = (e) => {
        setError('');
        setIsError(false);
        if (e.target.type === 'email') {
            setEmail(e.target.value);
        } else if (e.target.type === 'password') {
            setPassword(e.target.value);
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo da sua clínica" className="clinic-logo" />
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
                style={{ border: isError && email === '' ? '2px solid red' : '' }}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={handleInputChange}
                style={{ border: isError && password === '' ? '2px solid red' : '' }}
            />
            {error && <p className="error-message">{error}</p>}
            <div className="login-buttons-container">
                <button onClick={handleLogin}>Logar</button>
                <span style={{ margin: '0 5px' }}></span>
                <button onClick={handleSignUp}>Cadastre-se</button>
            </div>
            <p className="forgot-password" onClick={handleForgotPassword}>Esqueceu sua senha?</p>
        </div>
    );
};

export default Login;




