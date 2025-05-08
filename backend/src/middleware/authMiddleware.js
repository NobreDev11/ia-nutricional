const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido. Acesso negado.' });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'segredo123');
    req.usuario = decodificado;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = verificarToken;
