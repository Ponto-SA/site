const CHART = document.getElementById("cpuChart");
const CHART2 = document.getElementById("ramChart");
const CHART3 = document.getElementById("gpuChart");
const CHART4 = document.getElementById("cpuTempChart");
const CHART5 = document.getElementById("discChart");
const CHART6 = document.getElementById("disc2Chart");
const CHART7 = document.getElementById("cpuHistChart");
const CHART8 = document.getElementById("ramHistChart");
const CHART9 = document.getElementById("RamProcHistChart");
const CHART10 = document.getElementById("discHistChart");
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.color = "white";

const token = localStorage.getItem("token");
token == null ? (window.location.href = "../login/index.html") : "";

// Function starts
listarFuncionarios();
listarDispositivos()

let cpuChart = new Chart(CHART, {
  type: "doughnut",
  data: {
    labels: ["Livre", "Em uso"],
    datasets: [
      {
        label: "Porcentagem uso",
        backgroundColor: ["#240046", "#9370DB"],
        data: [60, 40],
      },
    ],
  },
});

let ramChart = new Chart(CHART2, {
  type: "doughnut",
  data: {
    labels: ["Livre", "Em uso"],
    datasets: [
      {
        label: "Porcentagem uso",
        backgroundColor: ["#240046", "#9370DB"],
        data: [50, 50],
      },
    ],
  },
});

let gpuChart = new Chart(CHART3, {
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
});

let cpuTempChart = new Chart(CHART4, {
  type: "doughnut",
  data: {
    labels: ["Temp. Max. Gap", "Temp. atual"],
    datasets: [
      {
        label: "Temperatura em °C",
        backgroundColor: ["#240046", "#9370DB"],
        data: [57, 43],
      },
    ],
  },
});

let discChart = new Chart(CHART5, {
  type: "pie",
  data: {
    labels: ["Livre", "Em uso"],
    datasets: [
      {
        label: "Porcentagem uso",
        backgroundColor: ["#240046", "#9370DB"],
        data: [180, 60],
      },
    ],
  },
});

let disc2Chart = new Chart(CHART6, {
  type: "pie",
  data: {
    labels: ["Livre", "Em uso"],
    datasets: [
      {
        label: "Porcentagem uso",
        backgroundColor: ["#240046", "#9370DB"],
        data: [250, 250],
      },
    ],
  },
});

let cpuHistChart = new Chart(CHART7, {
  type: "line",
  data: {
    labels: [
      "14:20:10",
      "14:20:20",
      "14:20:30",
      "14:20:50",
      "14:21:00",
      "14:21:10",
    ],
    datasets: [
      {
        label: "Uso CPU em %",
        backgroundColor: "#9370DB",
        borderColor: "#9370DB",
        pointBackgroundColor: "#9370DB",
        tension: 0.1,
        data: [20, 21.2, 23, 22, 24, 30],
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

let ramHistChart = new Chart(CHART8, {
  type: "line",
  data: {
    labels: [
      "14:20:10",
      "14:20:20",
      "14:20:30",
      "14:20:50",
      "14:21:00",
      "14:21:10",
    ],
    datasets: [
      {
        label: "Uso RAM em %",
        backgroundColor: "#9370DB",
        borderColor: "#9370DB",
        pointBackgroundColor: "#9370DB",
        tension: 0.1,
        data: [40.4, 39, 38, 41, 35, 37],
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

let ramProcHistChart = new Chart(CHART9, {
  type: "line",
  data: {
    labels: [
      "14:20:10",
      "14:20:20",
      "14:20:30",
      "14:20:50",
      "14:21:00",
      "14:21:10",
    ],
    datasets: [
      {
        label: "Uso RAM pelos processos em %",
        backgroundColor: "#9370DB",
        borderColor: "#9370DB",
        pointBackgroundColor: "#9370DB",
        tension: 0.1,
        data: [10, 8, 11, 11.5, 10.5, 10.8],
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

let discHistChart = new Chart(CHART10, {
  type: "line",
  data: {
    labels: [
      "14:20:10",
      "14:20:20",
      "14:20:30",
      "14:20:50",
      "14:21:00",
      "14:21:10",
    ],
    datasets: [
      {
        label: "Uso DISCO em %",
        backgroundColor: "#9370DB",
        borderColor: "#9370DB",
        pointBackgroundColor: "#9370DB",
        tension: 0.1,
        data: [25, 25.5, 26, 26.1, 26.2, 26.25],
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

/*INICIO JAVA SCRIPT NAVBAR*/
const menuToggle = document.querySelector(".menuToggle");
const navigation = document.querySelector(".navigation");

menuToggle.onclick = function () {
  navigation.classList.toggle("open");
};

const list = document.querySelectorAll(".list");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

function iconeDados() {
  chartBox.style.display = "";
  chartBox2.style.display = "";
  telaDePonto.style.display = "none";
  telaDeUsuarios.style.display = "none";
  telaDeDispositivos.style.display = "none";
}

function iconePonto() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "";
  telaDeUsuarios.style.display = "none";
  telaDeDispositivos.style.display = "none";
}

function iconeUser() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "none";
  telaDeUsuarios.style.display = "";
  telaDeDispositivos.style.display = "none";
}
function iconeDevice() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "none";
  telaDeUsuarios.style.display = "none";
  telaDeDispositivos.style.display = "";
}
function logout() {
  sessionStorage.clear();
  window.location = "../login/index.html";
}
/*TERMINO JAVA SCRIPT NAVBAR*/
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

span2.onclick = function () {
  modal2.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/*MODAL DISPOSITIVO*/
var modalDispositivo = document.getElementById("myModalDispositivo");
var modalDispositivo2 = document.getElementById("myModalDispositivo2");
var btnDevice = document.getElementById("myBtnDevice");
var btnDevice2 = document.getElementById("myBtnDevice2");
var spanDevice = document.getElementsByClassName("closeModalDevice")[0];
var spanDevice2 = document.getElementsByClassName("closeModalDevice2")[0];


btnDevice.onclick = function(){
  modalDispositivo.style.display = "block";
}

spanDevice.onclick = function () {
  modalDispositivo.style.display = "none";
};
spanDevice2.onclick = function () {
  modalDispositivo2.style.display = "none"; 
};

/*FIM MODAL*/

function modalAtualizarUser(id, nome, sobrenome, email, status) {
  modal2.style.display = "block";
  attUserNome.value = nome;
  attUserSobrenome.value = sobrenome;
  attUserEmail.value = email;

  status === 1
    ? (attUserAtivo.checked = true)
    : (attUserInativo.checked = true);
}

function atualizarUser() {
  modal2.style.display = "none";
  const isAtivo = attUserAtivo.checked ? 1 : 0;
  attUserNome.value;
  attUserEmail.value;
  attUserSenha.value;
  attUserConfirmSenha.value;

  console.log(attUserSenha.value);


}

function deletarUser() {
  var hostNameUser = document.getElementById("hostName");
  Swal.fire({
    title: "Deletar este usuario ?",
    text: "Digite o hostname para deletar !",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Ops, Cancela!",
    confirmButtonText: "Ok, Pode Deletar!",
  }).then((result) => {
    console.log(result);
    if (result.value == `${hostNameUser}`) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else if (result.dismiss == "cancel") {
      Swal.fire("Ação cancelada!", "", "error");
    } else {
      Swal.fire("Hostname incorreto!", "", "error");
    }
  });
}

function modalAtualizarDispositivo(hostname, id) {
  modalDispositivo2.style.display = "block";
  console.log(hostname)
  attHostname.value = hostname;
  attId.value = id;
}

function atualizarDispositivo(){
  idUsuario = selectUsers2.value;
  hostName = attHostname.value;
  idDispositivo = attId.value


 fetch("/dispositivos/atualizarDispositivo", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify({
      token,
      idUsuario,
      hostName,
      idDispositivo
  })
}).then((response) => {
  response.json().then((dados) => {
    console.log(dados)
   })

  if(response.ok){
      Swal.fire(
          'Dispositivo cadastrado com sucesso!',
          
        )

      
  }else {
      response.json().then((dados) => {
          Swal.fire(
              `${dados.mensagem}`,
              '',
              'error'
            )
      })



     
  }
}).catch((error) => {
  console.log(`#ERRO: ${error}`);
});

  return false;
}

function listarFuncionarios() {
  
  const cardsusers = document.getElementById("cardsusers");
  fetch("/usuarios/funcionarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((response) => {
    response.json().then((dados) => {
      dados.forEach((dados) => {
        console.log(dados); 
        selectUsers.innerHTML += `<option value = ${dados.id}>${dados.nome} ${dados.sobrenome}</option>`
        selectUsers2.innerHTML += `<option value = ${dados.id}>${dados.nome} ${dados.sobrenome}</option>`
        cardsusers.innerHTML += `
                <div id="cardAcesso">
                    <div id="infoUser">
                        <h3>Dados Usuario:</h3>
                        <p>Nome: <span>${dados.nome}</span></p>
                        <p>Sobrenome: <span>${dados.sobrenome}</span></p>
                        <p>Email: <span>${dados.email}</span></p>
                        <p>Funcionario ativo: <span>${
                          dados.status === 1 ? "Sim" : "Não"
                        }</span></p>
                    </div>
                        <div id="editUser">
                            <ion-icon name="create" onclick="modalAtualizarUser(${
                              dados.id
                            }, '${dados.nome}', '${dados.sobrenome}', '${dados.email}', ${
          dados.status
        })"></ion-icon>
                        </div>
                        <div id="editUser">
                            <ion-icon name="trash" onclick="deletarUser()"></ion-icon>
                        </div>
                </div>
                `;
      });
    });
  });
}


function cadastrar(){
  let marca = String(addMarca.value.trim());
  let modelo = String(addModelo.value.trim());
  let hostName = String(addHostName.value.trim());
  let idUsuario = Number(selectUsers.value);
  console.log(idUsuario)

 fetch("/dispositivos/cadastrar", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify({
      idUsuario,
      marca,
      modelo,
      hostName
  })
}).then((response) => {
  response.json().then((dados) => {
        console.log(dados)
   } )

  if(response.ok){
      Swal.fire(
          'Dispositivo cadastrado com sucesso!',
          
        )

      
  }else {
      response.json().then((dados) => {
          Swal.fire(
              `${dados.mensagem}`,
              '',
              'error'
            )
      })

      addMarca.value = "";
      addModelo.value = "";
      addHostName.value = "";

     
  }
}).catch((error) => {
  console.log(`#ERRO: ${error}`);
});

  return false;
}

function listarDispositivos() {

  const cardsDevices= document.getElementById("cardsDevices");
  fetch("/dispositivos/listar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((response) => {
    response.json().then((dados) => {
      dados.forEach((dados) => {
        console.log(dados)
        cardsDevices.innerHTML += `
                <div id="cardAcesso">
                    <div id="infoUser">
                        <h3>Dados Dispositivo:</h3>
                        <p>Marca: <span>${dados.marca}</span></p>
                        <p>Modelo: <span>${dados.modelo}</span></p>
                        <p>Hostname: <span>${dados.host_name}</span></p>
                        <p>Funcionario: <span>${dados.nome} ${dados.sobrenome}</span></p>
                    </div>
                        <div id="editUser">
                            <ion-icon name="create" onclick="modalAtualizarDispositivo( '${dados.host_name}', '${dados.id}'
                            )"></ion-icon>
                        </div>
                        <div id="editUser">
                            <ion-icon name="trash" onclick="deletarDispositivo()"></ion-icon>
                        </div>
                </div>
                `;
      });
    });
  });
}