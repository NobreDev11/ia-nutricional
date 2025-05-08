const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  altura: String,
  peso: String,
  dataNascimento: String,
  sexo: String,
});

module.exports = mongoose.model('Usuario', usuarioSchema);
