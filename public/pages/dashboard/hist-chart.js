const formatDateToday = moment().format("YYYY-MM-DD");
const formatDateSubstract1Week = moment().subtract(7, 'days').format("YYYY-MM-DD");
const formatDateSubstract2Week = moment().subtract(14, 'days').format("YYYY-MM-DD");
const formatDateSubstract1Month = moment().subtract(30, 'days').format("YYYY-MM-DD");

const CHART7 = document.getElementById("cpuHistChart");
const CHART8 = document.getElementById("ramHistChart");
const CHART9 = document.getElementById("RamProcHistChart");
const CHART10 = document.getElementById("discHistChart");
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.color = "white";

function plotCpuHistChart(resposta) {
  if (Chart.getChart("cpuHistChart")) {
    Chart.getChart("cpuHistChart").destroy();
  }

  let cpuHistChart = new Chart(CHART7, {
    type: "line",
    data: {
      labels: [
      ],
      datasets: [
        {
          label: "Uso CPU em %",
          backgroundColor: "#9370DB",
          borderColor: "#9370DB",
          pointBackgroundColor: "#9370DB",
          tension: 0.1,
          data: [],
        },
      ],
    },
    options: {
      scales: {
        y: {
          grid: {
            color: "white",
          },
        },
        x: {
          grid: {
            color: "white",
          },
        },
      },
    },
  });

  for (i = 0; i < resposta.length; i++) {
    let formatedDate = resposta[i].data_hora
      .replace('T', " ").replace('Z', "").replace(".000", "");
    cpuHistChart.data.labels.push(formatedDate);

    cpuHistChart.data.datasets[0].data.push(Number(resposta[i].registro));
    cpuHistChart.update();
  }
}

function plotRamHistChart(resposta) {
  if (Chart.getChart("ramHistChart")) {
    Chart.getChart("ramHistChart").destroy();
  }

  let ramHistChart = new Chart(CHART8, {
    type: "line",
    data: {
      labels: [
      ],
      datasets: [
        {
          label: "Uso RAM em %",
          backgroundColor: "#9370DB",
          borderColor: "#9370DB",
          pointBackgroundColor: "#9370DB",
          tension: 0.1,
          data: [],
        },
      ],
    },
    options: {
      scales: {
        y: {
          grid: {
            color: "white",
          },
        },
        x: {
          grid: {
            color: "white",
          },
        },
      },
    },
  });

  for (i = 0; i < resposta.length; i++) {
    let formatedDate = resposta[i].data_hora
      .replace('T', " ").replace('Z', "").replace(".000", "");
    ramHistChart.data.labels.push(formatedDate);

    ramHistChart.data.datasets[0].data.push(Number(resposta[i].registro));
    ramHistChart.update();
  }
}

function plotRamProcHistChart(resposta) {
  if (Chart.getChart("RamProcHistChart")) {
    Chart.getChart("RamProcHistChart").destroy();
  }

  let ramProcHistChart = new Chart(CHART9, {
    type: "line",
    data: {
      labels: [
      ],
      datasets: [
        {
          label: "Uso RAM pelos processos em %",
          backgroundColor: "#9370DB",
          borderColor: "#9370DB",
          pointBackgroundColor: "#9370DB",
          tension: 0.1,
          data: [],
        },
      ],
    },
    options: {
      scales: {
        y: {
          grid: {
            color: "white",
          },
        },
        x: {
          grid: {
            color: "white",
          },
        },
      },
    },
  });
  for (i = 0; i < resposta.length; i++) {
    let formatedDate = resposta[i].data_hora
      .replace('T', " ").replace('Z', "").replace(".000", "");
    ramProcHistChart.data.labels.push(formatedDate);

    ramProcHistChart.data.datasets[0].data.push(Number(resposta[i].registro) * 0.25);
    ramProcHistChart.update();
  }
}

function plotDiscHistChart(resposta) {
  if (Chart.getChart("discHistChart")) {
    Chart.getChart("discHistChart").destroy();
  }

  let discHistChart = new Chart(CHART10, {
    type: "line",
    data: {
      labels: [
      ],
      datasets: [
        {
          label: "Uso DISCO em %",
          backgroundColor: "#9370DB",
          borderColor: "#9370DB",
          pointBackgroundColor: "#9370DB",
          tension: 0.1,
          data: [],
        },
      ],
    },
    options: {
      scales: {
        y: {
          grid: {
            color: "white",
          },
        },
        x: {
          grid: {
            color: "white",
          },
        },
      },
    },
  });
  for (i = 0; i < resposta.length; i++) {
    let formatedDate = resposta[i].data_hora
      .replace('T', " ").replace('Z', "").replace(".000", "");
    discHistChart.data.labels.push(formatedDate);

    discHistChart.data.datasets[0].data.push(Number(resposta[i].registro));
    discHistChart.update();
  }
}

function cpuHistFilterPeriod() {
  let period = hist_filter_cpu.value;

  if (period == "hoje") {
    return [
      {
        "today": formatDateToday,
        "gap": 0,
        "tipo_metrica": 1
      }
    ];
  } else if (period == "umaSemana") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Week,
        "tipo_metrica": 1
      }
    ];
  } else if (period == "duasSemanas") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract2Week,
        "tipo_metrica": 1
      }
    ];
  }

  return [
    {
      "today": formatDateToday,
      "gap": formatDateSubstract1Month,
      "tipo_metrica": 1
    }
  ];
}

function ramHistFilterPeriod() {
  let period = hist_filter_ram.value;

  if (period == "hoje") {
    return [
      {
        "today": formatDateToday,
        "gap": 0,
        "tipo_metrica": 2
      }
    ];
  } else if (period == "umaSemana") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Week,
        "tipo_metrica": 2
      }
    ];
  } else if (period == "duasSemanas") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract2Week,
        "tipo_metrica": 2
      }
    ];
  }

  return [
    {
      "today": formatDateToday,
      "gap": formatDateSubstract1Month,
      "tipo_metrica": 2
    }
  ];
}

function ramProcHistFilterPeriod() {
  let period = hist_filter_ram_proc.value;

  if (period == "hoje") {
    return [
      {
        "today": formatDateToday,
        "gap": 0,
        "tipo_metrica": 5
      }
    ];
  } else if (period == "umaSemana") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Week,
        "tipo_metrica": 5
      }
    ];
  } else if (period == "duasSemanas") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract2Week,
        "tipo_metrica": 5
      }
    ];
  }

  return [
    {
      "today": formatDateToday,
      "gap": formatDateSubstract1Month,
      "tipo_metrica": 5
    }
  ];
}

function discHistFilterPeriod() {
  let period = hist_filter_disc.value;
  let disc = disc_select.value;

  if (period == "hoje" && disc == "disco1") {
    return [
      {
        "today": formatDateToday,
        "gap": 0,
        "tipo_metrica": 3
      }
    ];
  } else if (period == "umaSemana" && disc == "disco1") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Week,
        "tipo_metrica": 3
      }
    ];
  } else if (period == "duasSemanas" && disc == "disco1") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract2Week,
        "tipo_metrica": 3
      }
    ];
  } else if (period == "quatroSemanas" && disc == "disco1") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Month,
        "tipo_metrica": 3
      }
    ];
  } else if (period == "hoje" && disc == "disco2") {
    return [
      {
        "today": formatDateToday,
        "gap": 0,
        "tipo_metrica": 6
      }
    ];
  } else if (period == "umaSemana" && disc == "disco2") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Week,
        "tipo_metrica": 6
      }
    ];
  } else if (period == "duasSemanas" && disc == "disco2") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract2Week,
        "tipo_metrica": 6
      }
    ];
  } else if (period == "quatroSemanas" && disc == "disco2") {
    return [
      {
        "today": formatDateToday,
        "gap": formatDateSubstract1Month,
        "tipo_metrica": 6
      }
    ];
  }
}

function getHistoricoCpu(historicParams, idDispositivo) {
  fetch(`/hardware/getHistoric`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      historicParams,
      token,
      idDispositivo,
    }),
  }).then(function (response) {
    console.log(response)
    if (response.ok) {
      response.json().then(function (resposta) {
        plotCpuHistChart(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getHistoricoRam(historicParams, idDispositivo) {
  fetch(`/hardware/getHistoric`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      historicParams,
      token,
      idDispositivo,
    }),
  }).then(function (response) {
    console.log(response)
    if (response.ok) {
      response.json().then(function (resposta) {
        plotRamHistChart(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getHistoricoRamProc(historicParams, idDispositivo) {
  fetch(`/hardware/getHistoric`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      historicParams,
      token,
      idDispositivo,
    }),
  }).then(function (response) {
    console.log(response)
    if (response.ok) {
      response.json().then(function (resposta) {
        plotRamProcHistChart(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getHistoricoDisc(historicParams, idDispositivo) {
  fetch(`/hardware/getHistoric`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      historicParams,
      token,
      idDispositivo,
    }),
  }).then(function (response) {
    console.log(response)
    if (response.ok) {
      response.json().then(function (resposta) {
        plotDiscHistChart(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function cpuHistFilter() {
  getHistoricoCpu(cpuHistFilterPeriod(), sessionStorage.UserDash);
}

function ramHistFilter() {
  getHistoricoRam(ramHistFilterPeriod(), sessionStorage.UserDash);
}

function ramProcHistFilter() {
  getHistoricoRamProc(ramProcHistFilterPeriod(), sessionStorage.UserDash);
}

function discHistFilter() {
  getHistoricoDisc(discHistFilterPeriod(), sessionStorage.UserDash);
}


setTimeout(() => {
  cpuHistFilter();
  ramHistFilter();
  ramProcHistFilter();
  discHistFilter();
}, 1000)
