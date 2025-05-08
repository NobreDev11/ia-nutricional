fetch('http://localhost:5000/api/usuarios/logout', {
    method: 'POST',
    credentials: 'include'
  }).then(() => {
    alert('Logout realizado!');
    navigate('/login');
  });
  