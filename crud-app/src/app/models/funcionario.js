const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
  nome: String,
  funcao: String,
  // Adicione outros campos conforme necessário
});

const Funcionario = mongoose.model('Funcionario', FuncionarioSchema);

module.exports = Funcionario;