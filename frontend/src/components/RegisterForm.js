import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    altura: '',
    peso: '',
    dataNascimento: '',
    sexo: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/login`, formData);
      alert(response.data.message || 'Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      const mensagem = error.response?.data?.error || 'Erro ao cadastrar. Verifique os dados.';
      alert(mensagem);
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
        <input name="altura" placeholder="Altura (ex: 1.75)" value={formData.altura} onChange={handleChange} required />
        <input name="peso" placeholder="Peso (kg)" value={formData.peso} onChange={handleChange} required />
        <input name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} required />
        <select name="sexo" value={formData.sexo} onChange={handleChange} required>
          <option value="">Selecione o sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        <button type="submit">Cadastrar</button>
        <button type="button" className="btn-secundario" onClick={() => navigate('/')}>Voltar</button>
      </form>
    </div>
  );
}

export default RegisterForm;
