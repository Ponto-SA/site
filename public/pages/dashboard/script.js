const token = localStorage.getItem("token");
token == null ? (window.location.href = "../login/index.html") : "";

// Function starts
listarFuncionarios();
listarDispositivos();

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
/*INICIO MODAL*/

/*MODAL ACESSO*/
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

btnDevice.onclick = function () {
  modalDispositivo.style.display = "block";
};

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
  idUser.value = id;

  status === 1
    ? (attUserAtivo.checked = true)
    : (attUserInativo.checked = true);
}

function atualizarUser() {
  modal2.style.display = "none";
  const isAtivo = attUserAtivo.checked ? 1 : 0;
  const id = idUser.value;
  const nome = attUserNome.value;
  const sobrenome = attUserSobrenome.value;
  const email = attUserEmail.value;
  const senha = attUserSenha.value;
  const confirmSenha = attUserConfirmSenha.value;

  const opcao = senha === "" ? 1 : 2;

  if (senha.trim() == confirmSenha.trim()) {
    fetch("/usuarios/atualizarFuncionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        idFuncionario: id,
        nome,
        sobrenome,
        email,
        senha,
        status: isAtivo,
        opcao,
      }),
    })
      .then(() => {
        Swal.fire("Sucesso!", "Usuário atualizado com exito.", "success");
        listarFuncionarios();
      })
      .catch((err) => {
        Swal.fire("Error", `${err}`, "error");
      });
  }
}

function deletarUser(id, email) {
  Swal.fire({
    title: "Deletar este usuario ?",
    text: "Digite o e-mail para deletar !",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Ops, Cancelar!",
    confirmButtonText: "Ok, Pode Deletar!",
  }).then((result) => {
    if (result.value == email) {
      fetch("/usuarios/deletar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          idFuncionario: id,
        }),
      }).then(() => {
        Swal.fire("Deletado!", "Usuário deletado com sucesso.", "success");
        listarFuncionarios();
      });
    } else if (result.dismiss == "cancel") {
      Swal.fire("Ação cancelada!", "", "error");
    } else {
      Swal.fire("E-mail incorreto!", "", "error");
    }
  });
}

function modalAtualizarDispositivo(hostname, id) {
  modalDispositivo2.style.display = "block";
  console.log(hostname);
  attHostname.value = hostname;
  attId.value = id;
}

function cadastrarUser() {
  const nome = newNome.value;
  const sobrenome = newSobrenome.value;
  const email = newEmail.value;
  const senha = newSenha.value;
  const confirmSenha = newConfirmSenha.value;

  const senhaCorret = senha === confirmSenha ? true : false;

  if (senhaCorret) {
    fetch("/usuarios/cadastrarFuncionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        firstname: nome,
        lastname: sobrenome,
        email,
        senha,
      }),
    })
      .then((res) => {
        res.json().then((dados) => {
          Swal.fire(`${dados.mensagem}`, "", "success");
        });
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
        console.log(err);
      });
  } else {
    Swal.fire("Senhas divergentes!", "", "error");
  }
}

function atualizarDispositivo() {
  idUsuario = selectUsers2.value;
  hostName = attHostname.value;
  idDispositivo = attId.value;

  fetch("/dispositivos/atualizarDispositivo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      idUsuario,
      hostName,
      idDispositivo,
    }),
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire("Dispositivo cadastrado com sucesso!", "", "success");
        modalDispositivo2.style.display = "none";
        listarDispositivos();
      } else {
        response.json().then((dados) => {
          Swal.fire(`${dados.mensagem}`, "", "error");
        });
      }
    })
    .catch((error) => {
      console.log(`#ERRO: ${error}`);
    });

  return false;
}

function deletarMaquina(hostname) {
  Swal.fire({
    title: "Deletar esta máquina ?",
    text: "Digite o hostname para deletar !",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Ops, Cancelar!",
    confirmButtonText: "Ok, Pode Deletar!",
  }).then((result) => {
    if (result.value === hostname) {
      fetch("/dispositivos/deletar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          hostname,
        }),
      }).then((response) => {
        response.json().then((dados) => {
          if (response.ok) {
            Swal.fire(`${dados.mensagem}`, "", "success");
            listarDispositivos();
          } else {
            Swal.fire(`${dados.mensagem}`, "", "error");
          }
        });
      });
    } else {
      Swal.fire(`Hostname incorreto!`, "", "error");
    }
  });
}

function listarFuncionarios() {
  const cardsusers = document.getElementById("cardsusers");
  cardsusers.innerHTML = "";
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
        selectUsers.innerHTML += `<option value = ${dados.id}>${dados.nome} ${dados.sobrenome}</option>`;
        selectUsers2.innerHTML += `<option value = ${dados.id}>${dados.nome} ${dados.sobrenome}</option>`;
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
                            }, '${dados.nome}', '${dados.sobrenome}', '${
          dados.email
        }', ${dados.status})"></ion-icon>
                        </div>
                        <div id="editUser">
                            <ion-icon name="trash" onclick="deletarUser(${
                              dados.id
                            }, '${dados.email}')"></ion-icon>
                        </div>
                </div>
                `;
      });
    });
  });
}

function cadastrarDipositivo() {
  let marca = String(addMarca.value.trim());
  let modelo = String(addModelo.value.trim());
  let hostName = String(addHostName.value.trim());
  let idUsuario = Number(selectUsers.value);

  fetch("/dispositivos/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuario,
      marca,
      modelo,
      hostName,
    }),
  })
    .then((response) => {
      response.json().then((dados) => {
        console.log(dados);
      });

      if (response.ok) {
        Swal.fire("Dispositivo cadastrado com sucesso!");
        listarDispositivos();
        myModalDispositivo.style.display = "none";
      } else {
        response.json().then((dados) => {
          Swal.fire(`${dados.mensagem}`, "", "error");
        });

        addMarca.value = "";
        addModelo.value = "";
        addHostName.value = "";
      }
    })
    .catch((error) => {
      console.log(`#ERRO: ${error}`);
    });

  return false;
}

function listarDispositivos() {
  const cardsDevices = document.getElementById("cardsDevices");
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
      cardsDevices.innerHTML = "";
      dados.forEach((dados) => {
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
                            <ion-icon name="trash" onclick="deletarMaquina('${dados.host_name}')"></ion-icon>
                        </div>
                </div>
                `;
      });
    });
  });
}
