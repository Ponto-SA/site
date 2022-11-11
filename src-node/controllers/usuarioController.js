const usuarioModel = require("../models/usuarioModel");
const empresaModel = require("../models/empresaModel");
const acessoModel = require("../models/acessoModel");
const associativaModel = require("../models/associativasModel");
const jwt = require("jsonwebtoken");
const assinature = "pontosa.com";

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
  var username = req.body.usernameServer;

  usuarioModel
    .listar(username)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

async function entrar(req, res) {
  const email = req.body.email;
  const senha = req.body.senha;

  const user = await usuarioModel.entrar(email, senha);

  const isUser = user.length == 0 ? false : true;
  if (isUser) {
    const idUser = user[0].id;
    const idsRelacionados = await associativaModel.idsRelacionado(idUser);

    const token = jwt.sign({ idUser, idsRelacionados }, assinature, {
      expiresIn: "1d",
    });
    res.status(200).json({
      auth: true,
      token,
      res: true,
    });
  } else {
    // transforma JSON em String
    res.status(404).json({
      mensagem: "Dados inexistentes!",
    });
  }
}

async function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  // Usuario
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const senha = req.body.senha;

  // Empresa
  const nomeEmpresa = req.body.nomeEmpresa;
  const cnpj = req.body.cnpj;

  // Endereço
  const rua = req.body.rua;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const cep = req.body.cep;
  const uf = req.body.uf;
  const cidade = req.body.cidade;

  var regex =
    /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

  // Faça as validações dos valores
  if (firstname.length < 3) {
    res.status(400).send("Seu nome está invalido!");
  } else if (
    (email.indexOf("@") < -1 && email.endsWith(".com.br") < -1) ||
    email.endsWith(".com") < -1
  ) {
    res.status(400).send("Seu email está ivalido!");
  } else if (senha.length < 8 || !regex.exec(senha)) {
    res.status(400).send("Sua senha está invalida!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

    const isEmpresa = await empresaModel.listarEmpresa(cnpj, 2);
    const statusEmpresa = isEmpresa.length == 0 ? true : false;

    const isUsuario = await usuarioModel.validIsEmail(email);
    const statusUsuario = isUsuario.length == 0 ? true : false;

    const isEndereco = await empresaModel.validEndereco(cep, numero);
    const statusEndereco = isEndereco.length == 0 ? false : isEndereco[0].id;

    if (statusUsuario && statusEmpresa) {
      const isCadUser = await cadUser(firstname, lastname, email, senha);
      const buscarUser = await usuarioModel.validIsEmail(email);
      await acessoModel.inserirAcesso(buscarUser[0].id, 2);

      const isCadEmpresa = await cadEmpresa(nomeEmpresa, cnpj);
      const buscarEmpresa = await empresaModel.listarEmpresa(cnpj, 2);

      if (isCadUser.affectedRows > 0 && isCadEmpresa.affectedRows > 0) {
        if (!statusEndereco > 0) {
          await cadEndereco(rua, numero, bairro, cep, cidade, uf);
          const buscarEndereco = await empresaModel.validEndereco(cep, numero);
          await empresaModel.relacionarDados(
            buscarUser[0].id,
            buscarEmpresa[0].id,
            buscarEndereco[0].id
          );
        } else {
          await empresaModel.relacionarDados(
            buscarUser[0].id,
            buscarEmpresa[0].id,
            statusEndereco
          );
        }
        res.json({
          mensagem: "success",
        });
      }
    } else {
      res.status(401).json({
        mensagem: "CNPJ ou E-mail já existente.",
      });
    }
  }
}

async function cadUser(nome, sobrenome, email, senha) {
  const cadastro = await usuarioModel.cadastrar(nome, sobrenome, email, senha);
  return cadastro;
}

async function cadEmpresa(nome, cnpj) {
  const cadastrar = await empresaModel.cadastrar(nome, cnpj);
  return cadastrar;
}

async function cadEndereco(rua, numero, bairro, cep, uf, cidade) {
  const cadastrar = await empresaModel.cadastrarEndereco(
    rua,
    numero,
    bairro,
    cep,
    uf,
    cidade
  );
  return cadastrar;
}

function listarFuncionarios(req, res) {
  const iduser = req.userId;
  const nivelAcesso = req.nivelAcesso;

  if (nivelAcesso === 2) {
    usuarioModel.listarFuncionarios(iduser).then((response) => {
      res.status(200).json(response);
    });
  } else {
    res.status(401).json({
      message: "Você não possuí acesso!",
    });
  }
}


function atualizarFuncionario(req, res){
  const nivelAcesso = req.nivelAcesso;
  const idFuncionario = req.body.idFuncionario;
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const status = req.body.status;
  const opcao = req.body.opcao;


if(nivelAcesso === 2){
  usuarioModel.atualizarFuncionario(idFuncionario, nome, email, senha, status, opcao).then((response) => {
    res.status(200).json(response);
  }).catch(err => {
    res.json(500).json(err)
  })
}else {
  res.json(401).json({mensagem: "Você não possuí acesso!"})

}
 


}

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  listarFuncionarios,
  atualizarFuncionario
};
