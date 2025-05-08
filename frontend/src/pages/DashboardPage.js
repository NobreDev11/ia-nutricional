import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';
import {
  FaUser, FaEnvelope, FaRulerVertical, FaWeight,
  FaBirthdayCake, FaVenusMars, FaSignOutAlt, FaEdit
} from 'react-icons/fa';

function DashboardPage() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuarios/perfil`, {
          withCredentials: true
        });
        setUsuario(response.data.usuario);
        setForm(response.data.usuario);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchPerfil();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/logout`, {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/usuarios/atualizar`,
        form,
        { withCredentials: true }
      );
      alert(response.data.message);
      setUsuario(response.data.usuarioAtualizado);
      setEditando(false);
    } catch (error) {
      alert('Erro ao atualizar os dados.');
    }
  };

  if (!usuario) return <p>Carregando dados...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2><FaUser /> Bem-vindo(a), {usuario.nome}!</h2>
        <p><FaEnvelope /> {usuario.email}</p>

        {editando ? (
          <>
            <input name="altura" placeholder="Altura" value={form.altura || ''} onChange={handleChange} />
            <input name="peso" placeholder="Peso" value={form.peso || ''} onChange={handleChange} />
            <input name="dataNascimento" type="date" value={form.dataNascimento || ''} onChange={handleChange} />
            <select name="sexo" value={form.sexo || ''} onChange={handleChange}>
              <option value="">Selecione o sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <button onClick={handleSalvar}>Salvar</button>
          </>
        ) : (
          <>
            <p><FaRulerVertical /> Altura: {usuario.altura} m</p>
            <p><FaWeight /> Peso: {usuario.peso} kg</p>
            <p><FaBirthdayCake /> Nascimento: {usuario.dataNascimento}</p>
            <p><FaVenusMars /> Sexo: {usuario.sexo}</p>
          </>
        )}

        <div className="dashboard-buttons">
          <button onClick={() => setEditando(!editando)}>
            <FaEdit /> {editando ? 'Cancelar' : 'Editar Dados'}
          </button>
          <button onClick={handleLogout}><FaSignOutAlt /> Sair</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
