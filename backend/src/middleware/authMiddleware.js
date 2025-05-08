const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token ausente.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo123');
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido.' });
  }
};

module.exports = verificarToken;
