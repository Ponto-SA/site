const enderecoModel = require("../models/enderecoModel");
const empresaModel = require("../models/empresaModel");

async function listUnicoEndereco(req, res) {
  const cep = req.body.cep;
  const endereco = await enderecoModel.listarUnicoEndereco(cep);

  res.json({
    endereco,
  });
}

async function listAll(req, res) {
  const idEmpresa = req.empresa;
  const empresas = await enderecoModel.listarAll(idEmpresa);

  res.json({
    empresas,
  });
}

async function novoEndereco(req, res) {
  const idGestor = req.userId;
  const idEmpresa = req.empresa;

  const rua = req.body.rua;
  const numero = req.body.numero;
  const cep = req.body.cep;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const uf = req.body.uf;

  await enderecoModel.novoEndereco(rua, numero, bairro, cep, cidade, uf);
  const idEndereco = await enderecoModel.listarUnicoIdEndereco(cep);

  await empresaModel.relacionarDados(idGestor, idEmpresa, idEndereco[0].id);

  res.json({
    mensagem: "Endereço cadastrado com sucesso"
  });
}

async function updateEndereco(req, res) {
  const cep = req.body.cep;
  const rua = req.body.rua;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const uf = req.body.uf;

  const id = await enderecoModel.listarUnicoIdEndereco(cep);
  await enderecoModel.updateEndereco(id[0].id, rua, numero, bairro, cep, cidade, uf);

  res.json({
    mensagem: "Atualizado com sucesso!",
  });
}

async function deletarEndereco(req, res) {
  const cep = req.body.cep;

  const idEndereco = await enderecoModel.listarUnicoIdEndereco(cep);

  await enderecoModel.deleteEndereco(idEndereco[0].id);

  res.json({
    mensagem: "Endereço deletado com sucesso",
  });
}


module.exports = {
    listUnicoEndereco,
    listAll,
    novoEndereco,
    updateEndereco,
    deletarEndereco
}
