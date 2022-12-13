const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id, usuario.email);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      email: usuario.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email } = req.params;
  const expReg = /\S+@\S+\.\S+/;

  if (!expReg.test(email)) {
    return res.status(400).json({
      ok: false,
      msg: "El email no es válido",
    });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (usuario)
      return res.status(200).json({
        ok: true,
        uid: usuario.id,
        email: usuario.email,
        token: await generarJWT(usuario.id, usuario.email),
      });

    const newUser = new Usuario({ email });
    await newUser.save();

    res.status(200).json({
      ok: true,
      uid: newUser.id,
      email: newUser.email,
      token: await generarJWT(newUser.id, newUser.email),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, email } = req;

  const token = await generarJWT(uid, email);

  res.json({
    ok: true,
    uid,
    email,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
