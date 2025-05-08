const express = require('express');
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  atualizarPerfil
} = require('../controllers/usuariosController');
const verificarToken = require('../middleware/authMiddleware');

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout feito com sucesso.' });
});
router.get('/perfil', verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});
router.put('/atualizar', verificarToken, atualizarPerfil);

module.exports = router;
