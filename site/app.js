// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var hardwareRouter = require("./src/routes/hardware");
var dispositivoRouter = require("./src/routes/dispositivos");
var pontoRouter = require("./src/routes/ponto");
var enderecoRouter = require("./src/routes/endereco");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/dispositivos", dispositivoRouter);
app.use("/hardware", hardwareRouter);
app.use("/ponto", pontoRouter);
app.use("/endereco", enderecoRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n`)
});
