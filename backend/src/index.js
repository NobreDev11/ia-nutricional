const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: true, // permite qualquer origem temporariamente
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api/usuarios', usuariosRoutes);

// Conexão com MongoDB Atlas
mongoose.connect('mongodb+srv://admin:Vyh4843Mp1107@cluster0.uv8tm9d.mongodb.net/ia-nutricional', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado ao MongoDB Atlas');

  // Usar porta do ambiente (Render exige isso)
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB Atlas:', err);
});
