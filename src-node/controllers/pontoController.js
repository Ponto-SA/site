const moment = require("moment-timezone");
const pontoModel = require("../models/pontoModel");

async function listAll(req, res) {
  const idUser = req.userId;

  const dados = await pontoModel.listAll(idUser);

    const arrayPontos = [];


    dados.forEach(dados => {

        const d2 = formDates(dados.entrada, dados.saida);
        arrayPontos.push(d2);
    });
  res.json({ pontos: arrayPontos });
}

function formDates(startExpedient, endExpedient) {
  const daySemana = moment
    .tz(startExpedient, "America/Sao_Paulo")
    .format("dddd");
  const daySemanaTraduzido = transformSemana(daySemana);

  const inicio = moment(startExpedient).format("DD/MM/YYYY HH:mm:ss");
  const fim = moment(endExpedient).format("DD/MM/YYYY HH:mm:ss");

  const horaInicio = moment(startExpedient).format("HH:mm:ss");
  const horarioFim = moment(endExpedient).format("HH:mm:ss");

  const horasTrabalhadas = intervaloHoras(inicio, fim);

  const dia = moment(startExpedient).format("ll");

  const horasSubtract = moment.duration(horasTrabalhadas).hours();
  const hrEx = horasSubtract - 8;
  



  return {
    inicio: horaInicio,
    saida: horarioFim,
    dia: dia,
    diaSemana: daySemanaTraduzido,
    horasTrabalhadas: horasTrabalhadas,
    hrTrabalhadasNumber: horasSubtract,
    bancoHoras: hrEx,
  };
}

function intervaloHoras(inicio, fim) {
  const ms = moment(fim, "DD/MM/YYYY HH:mm:ss").diff(
    moment(inicio, "DD/MM/YYYY HH:mm:ss")
  );
  const d = moment.duration(ms);
  return (s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss"));
}

function transformSemana(date) {
  switch (date) {
    case "Monday": {
      return "SEG";
    }
    case "Tuesday": {
      return "TER";
    }

    case "Wednesday": {
      return "QUA";
    }

    case "Thursday": {
      return "QUI";
    }

    case "Friday": {
      return "SEX";
    }

    case "Saturday": {
      return "SÁB";
    }

    case "Sunday": {
      return "DOM";
    }
  }
}

module.exports = {
  listAll,
};
