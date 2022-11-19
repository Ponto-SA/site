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
                    selectUser.innerHTML += `
                    <option value='${dados[i].id}'>${dados[i].nome}</option>
                    `
                }
                alimentarFiltro++;
            });

        })
    }
}