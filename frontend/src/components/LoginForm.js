import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/login`, { email, senha }, { withCredentials: true });
      navigate('/painel');
    } catch (err) {
      setErro('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
        <button type="button" className="btn-secundario" onClick={() => navigate('/cadastro')}>Criar conta</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
