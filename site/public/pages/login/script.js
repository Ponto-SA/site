const btn_entrar = document.getElementById("btn_entrar");

btn_entrar.addEventListener("click", logar);

function logar() {
  const email = String(input_email.value);
  const senha = String(input_senha.value);

  email == null || email == "" ? false : true;
  senha == null || senha == "" ? false : true;

  if (email && senha) {
    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    })
      .then((resposta) => {
        resposta.json().then((json) => {
          if (resposta.ok) {
            if(json.auth){
                localStorage.setItem('token', json.token);
                Swal.fire(
                    "Logado com sucesso!",
                    '',
                    "success"
                  );

                setTimeout(function () {
                    window.location = "../dashboard/index.html";
                }, 1000); // apenas para exibir o loading
            }

          } else {
            Swal.fire(
              "Ops, deu um erro!",
              `${json.mensagem}`,
              "error"
            );
          }
        });
      })
      .catch((erro) => {});
  } else {
    Swal.fire(
      "Possuí campos em branco.",
      "Preencha os campos para logar-se",
      "error"
    );
  }
}
