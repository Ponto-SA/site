var alimentarFiltro = 0;
function filterUser() {
    if (alimentarFiltro == 0) {
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
                for (let i = 0; i < dados.length; i++) {
                    selectColaborator.innerHTML += `
                    <option value='${dados[i].nome}'>${dados[i].nome}</option>
                    `
                }
                alimentarFiltro++;
            });

        })
    }
}

function filterUserDash() {
    let nome = selectColaborator.value;
    fetch("/usuarios/dadosDispositivoFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            nome,
        }),
    }).then((response) => {
        response.json().then((dados) => {
        sessionStorage.UserDash = dados[0].id;
        });
    })
}
window.onload = setTimeout(() => {
    filterUserDash(),
    filterUser()
  }, 500)