const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
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
  // Inicia o servidor somente após conexão bem-sucedida
  app.listen(5000, () => {
    console.log('🚀 Servidor rodando em http://localhost:5000');
  });
})
.catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB Atlas:', err);
});
