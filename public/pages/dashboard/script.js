const token = localStorage.getItem("token");
token == null ? (window.location.href = "../login/index.html") : "";

// Function starts
listarFuncionarios();
listarDispositivos();
listarAll();

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
  telaDeEndereco.style.display = "none";
}

function iconePonto() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "";
  telaDeUsuarios.style.display = "none";
  telaDeDispositivos.style.display = "none";
  telaDeEndereco.style.display = "none";
}

function iconeUser() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "none";
  telaDeUsuarios.style.display = "";
  telaDeDispositivos.style.display = "none";
  telaDeEndereco.style.display = "none";
}
function iconeDevice() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "none";
  telaDeUsuarios.style.display = "none";
  telaDeDispositivos.style.display = "";
  telaDeEndereco.style.display = "none";
}
function iconeAddress() {
  chartBox.style.display = "none";
  chartBox2.style.display = "none";
  telaDePonto.style.display = "none";
  telaDeUsuarios.style.display = "none";
  telaDeDispositivos.style.display = "none";
  telaDeEndereco.style.display = "";
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

/*MODAL ENDERECO*/
var modalEndereco = document.getElementById("myModalEndereco");
var modalEndereco2 = document.getElementById("myModalEndereco2");
var btnAddress = document.getElementById("myBtnAddress");
var btnAddress2 = document.getElementById("myBtnAddress2");
var spanAddress = document.getElementsByClassName("closeModalEndereco")[0];
var spanAddress2 = document.getElementsByClassName("closeModalEndereco2")[0];

btnAddress.onclick = function () {
  modalEndereco.style.display = "block";
};

spanAddress.onclick = function () {
  modalEndereco.style.display = "none";
};
spanAddress2.onclick = function () {
  modalEndereco2.style.display = "none";
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
  const isGestor = cargoGestorAtt.checked ? true : false;

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
        isGestor
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
  attHostname.value = hostname;
  attId.value = id;
}

function modalAtualizarEndereco(cep) {
  modalEndereco2.style.display = "block";
  cepEmpresa.value = cep;
}

function cadastrarUser() {
  const nome = newNome.value;
  const sobrenome = newSobrenome.value;
  const email = newEmail.value;
  const senha = newSenha.value;
  const confirmSenha = newConfirmSenha.value;

  const isGestor = cargoGestor.checked ? true : false;

  const senhaCorret = senha === confirmSenha ? true : false;

  if (senhaCorret && email.length > 0) {
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
        isGestor
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
  idDispositivo = Number(attId.value);


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
        Swal.fire("Dispositivo atualizado com sucesso!", "", "success");
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
                        <p>Funcionario ativo: <span>${dados.status === 1 ? "Sim" : "Não"
          }</span></p>
                    </div>
                        <div id="editUser">
                            <ion-icon name="create" onclick="modalAtualizarUser(${dados.id
          }, '${dados.nome}', '${dados.sobrenome}', '${dados.email
          }', ${dados.status})"></ion-icon>
                        </div>
                        <div id="editUser">
                            <ion-icon name="trash" onclick="deletarUser(${dados.id
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

  if (idUsuario == 0) {
    Swal.fire("Colaborador não informado !");
  } else if (marca.length <= 2) {
    Swal.fire("Marca com menos de 3 caracteres !");
  } else if (modelo.length <= 2) {
    Swal.fire("Modelo com menos de 3 caracteres !");
  } else if (hostName.length <= 2) {
    Swal.fire("Hostname com menos de 3 caracteres !");
  } else {
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
  }
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
/*Funções para o endereço*/
function listarEndereco() {
  fetch("/endereco/listAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((response) => {
    response.json().then((dados) => {

      cardsAddress.innerHTML = "";
      dados.empresas.forEach((dados) => {
        cardsAddress.innerHTML += `
        <div id="cardAddress">
          <div id="infoAddress">
            <h3>Dados Endereço:</h3>
            <p>Rua: <span>${dados.rua}</span></p>
            <p>Numero: <span>${dados.numero}</span></p>
            <p>Bairro: <span>${dados.bairro}</span></p>
            <p>Cep: <span id="cepEmpresa">${dados.cep}</span></p>
            <p>Cidade: <span>${dados.cidade}</span></p>
            <p>UF: <span>${dados.uf}</span></p>
          </div>
          <div id="editAddress">
            <ion-icon name="create" onclick="modalAtualizarEndereco('${dados.cep}')"></ion-icon>
          </div>
          <div id="editAddress">
            <ion-icon name="trash" onclick="deletarEndereco('${dados.cep}')"></ion-icon>
          </div>
        </div>
        `
      })
    })
  })
}

function atualizarEndereco() {
  let rua = addRuaUpdate.value;
  let numero = addNumeroUpdate.value;
  let bairro = addBairroUpdate.value;
  let cidade = addCidadeUpdate.value;
  let uf = addUfUpdate.value;
  let cepModal = addCepUpdate.value;
  let cep = cepEmpresa.value;
  if (rua.length < 1) {
    Swal.fire("Por favor informe a Rua !");
  } else if (numero.length < 1) {
    Swal.fire("Por favor informe o Numero !");
  } else if (bairro.length < 1) {
    Swal.fire("Por favor informe o Bairro !");
  } else if (cepModal.length < 8) {
    Swal.fire("CPF com menos de 8 caracteres !");
  } else if (cidade.length < 1) {
    Swal.fire("Por favor informe a Cidade !");
  } else if (uf.length < 1) {
    Swal.fire("Por favor informe o UF !");
  } else {
    fetch("/endereco/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        rua,
        numero,
        bairro,
        cep,
        cepModal,
        cidade,
        uf,
      }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire("Endereço atualizado com sucesso!", "", "success");
          listarEndereco();
          myModalEndereco2.style.display = "none";
        } else {
          response.json().then((dados) => {
            Swal.fire(`Falha ao atualizar !`, "", "error");
          });
        }
        addRuaUpdate.value = "";
        addNumeroUpdate.value = "";
        addBairroUpdate.value = "";
        addCepUpdate.value = "";
        addCidadeUpdate.value = "";
        addUfUpdate.value = "";
      })
      .catch((error) => {
        console.log(`#ERRO: ${error}`);
      });
  }
}

function cadastrarEndereco() {
  let rua = addRua.value;
  let numero = addNumero.value;
  let bairro = addBairro.value;
  let cep = addCep.value;
  let cidade = addCidade.value;
  let uf = addUF.value;

  if (rua.length < 1) {
    Swal.fire("Por favor informe a Rua !");
  } else if (numero.length < 1) {
    Swal.fire("Por favor informe o Numero !");
  } else if (bairro.length < 1) {
    Swal.fire("Por favor informe o Bairro !");
  } else if (cep.length < 8) {
    Swal.fire("CPF com menos de 8 caracteres !");
  } else if (cidade.length < 1) {
    Swal.fire("Por favor informe a Cidade !");
  } else if (uf.length < 1) {
    Swal.fire("Por favor informe o UF !");
  } else {
    fetch("/endereco/novo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        rua,
        numero,
        bairro,
        cep,
        cidade,
        uf,
      }),
    }).then((response) => {
      response.json().then((dados) => {

      });

      if (response.ok) {
        Swal.fire("Endereço cadastrado com sucesso!");
        listarEndereco();
        myModalEndereco.style.display = "none";
      } else {
        response.json().then((dados) => {
          Swal.fire(`Tente novamente !`, "", "error");
        });

        addRua.value = "";
        addNumero.value = "";
        addBairro.value = "";
        addCep.value = "";
        addCidade.value = "";
        addUF.value = "";
      }
    })
      .catch((error) => {
        console.log(`#ERRO: ${error}`);
      });
  }
}

function deletarEndereco(cep) {

  Swal.fire({
    title: "Deletar este endereço ?",
    text: "Digite o cep para deletar !",
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
    if (result.value == cep) {
      fetch("/endereco/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          cep
        }),
      }).then((response) => {
        response.json().then((dados) => {
          if (response.ok) {
            Swal.fire(`Sucesso !`, "", "success");
            listarEndereco();
          } else {
            Swal.fire(`Algo deu errado`, "", "error");
          }
        });
      });
    } else {
      Swal.fire(`cep incorreto!`, "", "error");
    }
  });
}

/*Termino Funções para o endereço*/
function gerarPDF() {
  var relatorio = tabela_ponto.innerHTML;
  var doc = new jsPDF();
  doc.fromHTML(
    "<h1>**********Relatorio de Ponto*********</h1>" + relatorio,
    33,
    2
  );
  doc.save("RelatorioPonto.pdf");
}

function listarAll() {
  arrayPontos.innerHTML = "";
  fetch("/ponto/listAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((response) => {
    response.json().then((dados) => {

      let totalHoras = 0;
      let banco = 0;

      dados.pontos.forEach((dados) => {

        totalHoras += dados.hrTrabalhadasNumber;
        banco += dados.bancoHoras;

        arrayPontos.innerHTML += `
          <tr id="trPonto">
            <td>${dados.dia} - ${dados.diaSemana}</td>
            <td>${dados.inicio}</td>
            <td>${dados.saida}</td>
            <td>${dados.horasTrabalhadas}h</td>
            <td>${dados.bancoHoras}h</td>
          </tr>
        `;
      });

      hr_t.innerHTML = totalHoras + "Hrs";
      hr_e.innerHTML = banco + "Hrs";


    });
  });
}
