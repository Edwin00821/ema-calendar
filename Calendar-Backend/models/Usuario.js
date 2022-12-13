const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Usuario", UsuarioSchema);
