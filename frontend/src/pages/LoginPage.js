import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="pagina-login">
      <div className="login-box">
        <h2>Acesso ao Sistema Nutricional</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
