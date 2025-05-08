import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErro('');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/usuarios/login`,
        formData,
        { withCredentials: true }
      );
      navigate('/painel');
    } catch (err) {
      console.error('Erro no login:', err);
      setErro('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {erro && <p className="erro">{erro}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
        <button
          type="button"
          className="btn-secundario"
          onClick={() => navigate('/cadastro')}
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
