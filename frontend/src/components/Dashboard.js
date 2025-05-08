import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/usuarios/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bem-vindo ao Painel Nutricional</h1>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </header>
      <main className="dashboard-content">
        <div className="card">
          <h2>Visão Geral</h2>
          <p>Seu progresso nutricional aparecerá aqui.</p>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
