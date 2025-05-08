const express = require('express');
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  perfilUsuario,
  atualizarPerfil,
  logoutUsuario
} = require('../controllers/usuariosController');
const verificarToken = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);

// Rotas protegidas
router.get('/perfil', verificarToken, perfilUsuario);
router.put('/atualizar', verificarToken, atualizarPerfil);
router.post('/logout', verificarToken, logoutUsuario);

module.exports = router;
