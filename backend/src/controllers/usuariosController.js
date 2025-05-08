const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastrar usuário
const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, altura, peso, dataNascimento, sexo } = req.body;

    const emailExistente = await Usuario.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      altura,
      peso,
      dataNascimento,
      sexo
    });

    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro interno ao cadastrar.' });
  }
};

// Login do usuário
const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: true // Importante para produção com HTTPS
    });

    res.json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no login.' });
  }
};

// Perfil do usuário autenticado
const perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-senha');
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
};

// Atualizar perfil
const atualizarPerfil = async (req, res) => {
  try {
    const atualizacao = req.body;
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      req.usuario.id,
      atualizacao,
      { new: true }
    ).select('-senha');

    res.json({ message: 'Perfil atualizado com sucesso!', usuarioAtualizado });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
};

// Logout
const logoutUsuario = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout efetuado com sucesso!' });
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  perfilUsuario,
  atualizarPerfil,
  logoutUsuario
};
