function respawnButton(cl, name, url, style) {
  document.querySelector(cl).innerHTML = `
    <div class="${style}">
        <a href="${url}">${name}</a>
    </div>
    `;
}

const url = window.location.href;
const indendity = url.split("/");

switch(indendity[4]){
  case "home": {
    respawnButton(".btnLogin", "Login", "../login/index.html", "buttonNavgation");
    respawnButton(".btnCadastro", "Registrar", "../cadastro/index.html", "buttonRegister");
    break;
  }
  case "cadastro": {
    respawnButton(".btnInicio", "Inicio", "../home/index.html", "buttonNavgation");
    break;
  }
  case "login": {
    respawnButton(".btnInicio", "Inicio", "../home/index.html", "buttonNavgation");
    break;
  }

}
// RESPAWN

