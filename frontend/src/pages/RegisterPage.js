import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="pagina-cadastro">
      <div className="cadastro-box">
        <h2>Cadastro de Usuário</h2>
        <RegisterForm />
        <button className="voltar" onClick={() => navigate('/')}>Voltar</button>
      </div>
    </div>
  );
}

export default RegisterPage;
