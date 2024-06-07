import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import '../App.css';
import logo from '../images/logo_+Saude.png';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (email === '' || password === '' || confirmPassword === '') {
            setError('Todos os campos são obrigatórios');
            setIsError(true);
            return;
        }

        if (!validateEmail(email)) {
            setError('E-mail inválido');
            setIsError(true);
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            setIsError(true);
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            setIsError(true);
            return;
        }

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('E-mail já utilizado');
            } else {
                setError('Ocorreu um erro ao cadastrar. Por favor, tente novamente mais tarde.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo da sua clínica" className="clinic-logo" />
            <h2>Cadastre-se</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
                style={{ border: isError && email === '' ? '2px solid red' : '' }}
            />
            <input
                type="password"
                name="password"
                placeholder="Senha"
                value={password}
                onChange={handleInputChange}
                style={{ border: isError && (password === '' || password.length < 6) ? '2px solid red' : '' }}
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={handleInputChange}
                style={{ border: isError && (confirmPassword === '' || password !== confirmPassword) ? '2px solid red' : '' }}
            />
            {error && <p className="error-message">{error}</p>}
            <div className="login-buttons-container">
                <button onClick={handleSignUp}>Cadastrar</button>
                <button onClick={handleGoBack} style={{ marginLeft: '10px' }}>Voltar</button>
            </div>
        </div>
    );
};

export default SignUp;










