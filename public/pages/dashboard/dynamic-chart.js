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

  let cpuChart = new Chart(CHART, {
    type: "doughnut",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", "#9370DB"],
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

  let ramChart = new Chart(CHART2, {
    type: "doughnut",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", "#9370DB"],
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

  let ramProcChart = new Chart(CHART3, {
    type: "doughnut",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", "#9370DB"],
          data: [80, 20],
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

  let cpuTempChart = new Chart(CHART4, {
    type: "doughnut",
    data: {
      labels: ["Temp. Max. Gap", "Temp. atual"],
      datasets: [
        {
          label: "Temperatura em °C",
          backgroundColor: ["#240046", "#9370DB"],
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

  let discChart = new Chart(CHART5, {
    type: "pie",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", "#9370DB"],
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

  let disc2Chart = new Chart(CHART6, {
    type: "pie",
    data: {
      labels: ["Livre", "Em uso"],
      datasets: [
        {
          label: "Porcentagem uso",
          backgroundColor: ["#240046", "#9370DB"],
          data: [(discTotal - (Number(resposta[0].registro))), (Number(resposta[0].registro))],
        },
      ],
    },
    options: {
      animation: false
    }
  });
}

function getCpuUsage() {
  fetch(`/hardware/getCpuUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
}).then(function (response) {
    console.log(response)
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

function getRamUsage() {
  fetch(`/hardware/getRamUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
}).then(function (response) {
    console.log(response)
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

function getRamProcUsage() {
  fetch(`/hardware/getRamProcUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
}).then(function (response) {
    console.log(response)
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

function getCpuTemp() {
  fetch(`/hardware/getCpuTemp`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
}).then(function (response) {
    console.log(response)
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

function getDiscUsage() {
  fetch(`/hardware/getDiscUsage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
}).then(function (response) {
    console.log(response)
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(resposta)
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

function getDisc2Usage() {
  fetch(`/hardware/getDisc2Usage`, { 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token,
  }),
}).then(function (response) {
    console.log(response)
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(resposta)
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

getRamUsage();
getCpuUsage();
getRamProcUsage();
getCpuTemp();
getDiscUsage();
getDisc2Usage();

window.onload = setInterval(() => {
  getCpuUsage();
  getRamUsage();
  getRamProcUsage();
  getCpuTemp();
  getDiscUsage();
  getDisc2Usage();
}, 5000)