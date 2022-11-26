const jwt = require("jsonwebtoken");
const assinature = "pontosa.com";

function VerifyJWT(req, res, next) {
  const token = req.body.token;

  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Token não informado" });

  jwt.verify(token, assinature, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: "Token é inválido" });
    req.userId = decoded.idUser;
    req.nivelAcesso = decoded.idsRelacionados[0].nivel_acesso;
    req.endereco = decoded.idsRelacionados[0].endereco;
    req.empresa = decoded.idsRelacionados[0].empresa;
    next();
  });
}

module.exports = VerifyJWT;