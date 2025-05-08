const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, altura, peso, dataNascimento, sexo } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
      altura,
      peso,
      dataNascimento,
      sexo
    });

    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};

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
      {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        altura: usuario.altura,
        peso: usuario.peso,
        dataNascimento: usuario.dataNascimento,
        sexo: usuario.sexo
      },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false
    });

    res.json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no login.' });
  }
};

const atualizarPerfil = async (req, res) => {
  try {
    const { id } = req.usuario;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      {
        altura: req.body.altura,
        peso: req.body.peso,
        dataNascimento: req.body.dataNascimento,
        sexo: req.body.sexo
      },
      { new: true }
    );

    const novoToken = jwt.sign(
      {
        id: usuarioAtualizado._id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        altura: usuarioAtualizado.altura,
        peso: usuarioAtualizado.peso,
        dataNascimento: usuarioAtualizado.dataNascimento,
        sexo: usuarioAtualizado.sexo
      },
      process.env.JWT_SECRET || 'segredo123',
      { expiresIn: '7d' }
    );

    res.cookie('token', novoToken, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false
    });

    res.json({ message: 'Perfil atualizado com sucesso!', usuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  atualizarPerfil
};
