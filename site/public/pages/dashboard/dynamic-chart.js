const CHART = document.getElementById("cpuChart");
const CHART2 = document.getElementById("ramChart");
const CHART3 = document.getElementById("ramProcChart");
const CHART4 = document.getElementById("cpuTempChart");
const CHART5 = document.getElementById("discChart");
const CHART6 = document.getElementById("disc2Chart");
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.color = "white";

var tamanhoDisco = 0;

token == null ? (window.location.href = "../login/index.html") : "";

function cpuGraphPlot(resposta) {
  let cpuUsage = Number(resposta[0].registro);

  document.getElementById("cpuPercentageUsage").innerHTML = String(cpuUsage.toFixed(0)) + "%";

  if(Chart.getChart("cpuChart")){
    Chart.getChart("cpuChart").destroy();
  }

  document.getElementById("cpuChartBox").style.boxShadow = "5px 5px 5px 1px " + colorAlert(cpuUsage, 65, 80);
  
  let cpuChart = new Chart(CHART, {
    type: "doughnut",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", colorAlert(cpuUsage, 65, 80)],
          data: [(100 - cpuUsage), cpuUsage],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}

var ramUsageTotal = 0;
var ramTotalGb = 0;
function ramGraphPlot(resposta) {
  tamanhoDisco = resposta[0].tamanho;
  let ramUsage = Number(resposta[0].registro);
  let ramTotal = Number(resposta[0].memoria_total)
  let totalRamGb = (ramTotal * ramUsage) / 100;
  ramUsageTotal = ramUsage;
  ramTotalGb = totalRamGb;

  document.getElementById("ramPercentageUsage").innerHTML = String(ramUsage.toFixed(0)) + "%";
  document.getElementById("ramGb").innerHTML = totalRamGb.toFixed(1) + "/" + ramTotal.toFixed(1) + "GB";

  if(Chart.getChart("ramChart")){
    Chart.getChart("ramChart").destroy();
  }

  document.getElementById("ramChartBox").style.boxShadow = "5px 5px 5px 1px " + colorAlert(ramUsage, 70, 85);

  let ramChart = new Chart(CHART2, {
    type: "doughnut",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", colorAlert(ramUsage, 70, 85)],
          data: [(100 - ramUsage), ramUsage],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}

function ramProcGraphPlot(resposta) {
  let ramProcUsage = Number(resposta[0].registro);
  let ramProcUsageGb = (ramTotalGb * ramProcUsage) / 100;
  
  document.getElementById("ramProcPercentageUsage").innerHTML = String(ramProcUsage.toFixed(0)) + "%";
  document.getElementById("ramProcGb").innerHTML = ramProcUsageGb.toFixed(1) + "/"+ ramTotalGb.toFixed(1) + "GB";

  if(Chart.getChart("ramProcChart")){
    Chart.getChart("ramProcChart").destroy();
  }

  document.getElementById("ramProcChartBox").style.boxShadow = "5px 5px 5px 1px " + colorAlert(ramProcUsage, 30, 45);

  let ramProcChart = new Chart(CHART3, {
    type: "doughnut",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", colorAlert(ramProcUsage, 30, 45)],
          data: [(ramProcUsage - 100), ramProcUsage],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}

function cpuTempGraphPlot(resposta) {

  document.getElementById("cpuTempCelsius").innerHTML = resposta[0].registro + "°C";

  if(Chart.getChart("cpuTempChart")){
    Chart.getChart("cpuTempChart").destroy();
  }

  document.getElementById("cpuTempChartBox").style.boxShadow = "5px 5px 5px 1px " + colorAlert(resposta[0].registro, 60, 75);

  let cpuTempChart = new Chart(CHART4, {
    type: "doughnut",
    data: {
      labels: ["Temp. Max. Gap", "Temp. atual"],
      datasets: [
        {
          label: "Temperatura em °C",
          backgroundColor: ["#240046", colorAlert(resposta[0].registro, 60, 75)],
          data: [(100 - Number(resposta[0].registro)), resposta[0].registro],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}

function discUsageGraphPlot(resposta){
  
  let discTotal = tamanhoDisco;
  let percentageToGbUsage = (Number(resposta[0].registro) * discTotal) / 100;

  document.getElementById("discPercentageUsage").innerHTML = resposta[0].registro + "%";
  document.getElementById("discGb").innerHTML = percentageToGbUsage.toFixed(0) + "/" + discTotal.toFixed(0) + "GB";

  if(Chart.getChart("discChart")){
    Chart.getChart("discChart").destroy();
  }

  document.getElementById("discChartBox").style.boxShadow = "5px 5px 5px 1px " + colorAlert(resposta[0].registro, 80, 90);

  let discChart = new Chart(CHART5, {
    type: "pie",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", colorAlert(resposta[0].registro, 80, 90)],
          data: [(discTotal - percentageToGbUsage), percentageToGbUsage],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}


function disc2UsageGraphPlot(resposta){
  
  let discTotal = tamanhoDisco;
  let percentageToGbUsage = ((Number(resposta[0].registro)) * discTotal) / 100;

  document.getElementById("disc2PercentageUsage").innerHTML = (Number(resposta[0].registro)).toFixed(0) + "%";
  document.getElementById("disc2Gb").innerHTML = percentageToGbUsage.toFixed(0) + "/" + discTotal.toFixed(0) + "GB";

  if(Chart.getChart("disc2Chart")){
    Chart.getChart("disc2Chart").destroy();
  }

  document.getElementById("disc2ChartBox").style.boxShadow = "5px 5px 5px 1px " + colorAlert(resposta[0].registro, 80, 90);

  let disc2Chart = new Chart(CHART6, {
    type: "pie",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", colorAlert(resposta[0].registro, 80, 90)],
          data: [(discTotal - percentageToGbUsage), percentageToGbUsage],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}

function getCpuUsage(idDispositivo) {
  fetch(`/hardware/getCpuUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    idDispositivo
  }),
}).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        cpuGraphPlot(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getRamUsage(idDispositivo) {
  fetch(`/hardware/getRamUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    idDispositivo
  }),
}).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        ramGraphPlot(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getRamProcUsage(idDispositivo) {
  fetch(`/hardware/getRamProcUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    idDispositivo
  }),
}).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        ramProcGraphPlot(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getCpuTemp(idDispositivo) {
  fetch(`/hardware/getCpuTemp`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    idDispositivo
  }),
}).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        cpuTempGraphPlot(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getDiscUsage(idDispositivo) {
  fetch(`/hardware/getDiscUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    idDispositivo
  }),
}).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        discUsageGraphPlot(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function getDisc2Usage(idDispositivo) {
  fetch(`/hardware/getDisc2Usage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
    idDispositivo
  }),
}).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        disc2UsageGraphPlot(resposta);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function colorAlert(metric, alert, critic){
  if(metric >= critic){
    return "red";
  } else if(metric >= alert){
    return "orange";
  } else {
    return "#9370DB";
  }
}


getCpuUsage(Number(sessionStorage.UserDash));
getRamUsage(Number(sessionStorage.UserDash));
getRamProcUsage(Number(sessionStorage.UserDash));
getCpuTemp(Number(sessionStorage.UserDash));
getDiscUsage(Number(sessionStorage.UserDash));
getDisc2Usage(Number(sessionStorage.UserDash));

window.onload = setInterval(() => {
  getCpuUsage(Number(sessionStorage.UserDash));
  getRamUsage(Number(sessionStorage.UserDash));
  getRamProcUsage(Number(sessionStorage.UserDash));
  getCpuTemp(Number(sessionStorage.UserDash));
  getDiscUsage(Number(sessionStorage.UserDash));
  getDisc2Usage(Number(sessionStorage.UserDash));
}, 1000)