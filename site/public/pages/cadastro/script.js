const btn_proximo = document.getElementById("btn_proximo");
const btn_voltar = document.getElementById("btn_voltar");
const input_nome_empresa = document.getElementById("input_nome_empresa");
const input_username = document.getElementById("input_username");
const input_lastname = document.getElementById("input_lastname");
const input_email = document.getElementById("input_email");
const input_email_confirmar = document.getElementById("input_email_confirmar");
const input_senha = document.getElementById("input_senha");
const input_confirmar_senha = document.getElementById("input_confirmar_senha");
const campo_cep = document.getElementById("input_cep");
const input_bairro = document.getElementById("input_bairro");
const input_rua = document.getElementById("input_rua");
const input_numero = document.getElementById("input_numero");
const input_uf = document.getElementById("input_uf");
const input_cidade = document.getElementById("input_cidade");
const campo_cnpj = document.getElementById("input_cnpj");


const informacoes_empresa = document.getElementById("informacoes_empresa");
const informacoes_usuario = document.getElementById("informacoes_usuario");

//Visible Passaword
const FocusSenha = document.getElementById("FocusSenha");
const FocusSenha1 = document.getElementById("FocusSenha1");
// Icon Inicializy
FocusSenha.innerHTML = 'visibility_off';
FocusSenha1.innerHTML = 'visibility_off';



//addEventiListiner
btn_proximo.addEventListener("click", () => navegar(1));
btn_voltar.addEventListener("click", () => navegar(2));

FocusSenha.addEventListener("click", () => visiblePassword(1));
FocusSenha1.addEventListener("click", () => visiblePassword(2));

function visiblePassword(c){
    switch(c){
        case 1: {
            if(FocusSenha.innerHTML == 'visibility_off'){
                FocusSenha.innerHTML = 'visibility';
                input_senha.type = "text";
            }else {
                FocusSenha.innerHTML = 'visibility_off'
                input_senha.type = "password";
            }
            break;
        }case 2: {
            if(FocusSenha1.innerHTML == 'visibility_off'){
                FocusSenha1.innerHTML = 'visibility';
                input_confirmar_senha.type = "text";
            }else {
                FocusSenha1.innerHTML = 'visibility_off'
                input_confirmar_senha.type = "password";
            }
            break;
        }
    }


}



// btn_cadastro.addEventListener("click", cadastrar);

function cadastrar(){
    let username = String(input_username.value.trim());
    let lastname = String(input_lastname.value.trim());
    let email = String(input_email.value.trim());
    let email_confirmar = String(input_email_confirmar.value.trim());
    let senha = String(input_senha.value.trim());
    let confirmaSenha = String(input_confirmar_senha.value.trim());

    let nomeEmpresa = String(input_nome_empresa.value.trim());
    let cnpj = String(input_cnpj.value.trim());

    let cep = String(campo_cep.value.trim());
    let bairro = String(input_bairro.value.trim());
    let rua = String(input_rua.value.trim());
    let numero = String(input_numero.value.trim());
    let cidade = String(input_cidade.value.trim());
    let uf = String(input_uf.value.trim());
    

    console.log(username);

    let regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    if(username.length < 3){
        input_username.style.borderColor = "red";
        return false;
    } else {
        input_username.style.borderColor = "greenyellow";
        
    }

    if(email.indexOf("@") > 3 && email.endsWith(".com.br") || email.endsWith(".com")){
        input_email.style.borderColor = "greenyellow";
    } else {
        input_email.style.borderColor = "red";
        return false;
    }

    if(senha.length < 8 || senha.length == 0){
        input_senha.style.borderColor = 'red';
        return false;
    } else if (!regex.exec(senha)){
        input_senha.style.borderColor = 'red';
        return false;
    } else{
        input_senha.style.borderColor = 'greenyellow';
    }

    if(confirmaSenha == '' || confirmaSenha != senha || confirmaSenha.length < 8){
        input_confirmar_senha.style.borderColor = 'red';
        return false;
    } else {
        input_confirmar_senha.style.borderColor = 'greenyellow';
    }

   fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        firstname: username,
        lastname,
        email,
        senha,
        nomeEmpresa,
        cnpj,
        rua,
        numero,
        bairro,
        cep,
        uf,
        cidade,
    })
}).then((response) => {

    console.log("resposta: ", response);

    if(response.ok){
        Swal.fire(
            'Cadastrado com sucesso!',
            'Redirecionando para logar-se',
            'success'
          )

          setTimeout(() => {
                window.location.href = "/pages/login/index.html"
          }, 3000);
    }else {
        response.json().then((dados) => {
            Swal.fire(
                `${dados.mensagem}`,
                '',
                'error'
              )
        })

        input_email_confirmar.value = "";
        input_email.value = "";
        input_cnpj.value = "";

       
    }
}).catch((error) => {
    console.log(`#ERRO: ${error}`);
});

    return false;
}


function validacaoCadastro(){
    let username = String(input_username.value.trim());
    let email = String(input_email.value.trim());
    let senha = String(input_senha.value.trim());
    let confirmaSenha = String(input_confirmar_senha.value.trim());

    let regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    if(username.length < 3){
        input_username.style.borderColor = "red";
        return false;
    } else {
        input_username.style.borderColor = "greenyellow";
        
    }

    if(email.indexOf("@") > 3 && email.endsWith(".com.br") || email.endsWith(".com")){
        input_email.style.borderColor = "greenyellow";
    } else {
        input_email.style.borderColor = "red";
        return false;
    }

    if(senha.length < 8 || senha.length == 0){
        input_senha.style.borderColor = 'red';
        return false;
    } else if (!regex.exec(senha)){
        input_senha.style.borderColor = 'red';
        return false;
    } else{
        input_senha.style.borderColor = 'greenyellow';
    }

    if(confirmaSenha == '' || confirmaSenha != senha || confirmaSenha.length < 8){
        input_confirmar_senha.style.borderColor = 'red';
        return false;
    } else {
        input_confirmar_senha.style.borderColor = 'greenyellow';
    }
}

// Empresa

function mascaraCNPJ(){
   let cnpj = campo_cnpj.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
   campo_cnpj.value = cnpj;
}


function validarCep(){
    const onlyNumbers = new RegExp('^[0-9]+$')
    const valorCampo = campo_cep.value;
    const a = valorCampo.split("");
    if(onlyNumbers.exec(valorCampo) && valorCampo.length <= 8){

        let cepFormat = "";

        for(let i=0; i < a.length; i++){
            if(i == 4){
               cepFormat += a[i] + "-";
            }else {
                cepFormat += a[i];
            }
        }

        if(cepFormat.length == 9){
            return cepFormat;
        }else {
            return false;
        }
    }
}

function buscarEndereco(){
    const cep = validarCep();

    const bairro = document.getElementById("input_bairro");
    const rua = document.getElementById("input_rua");
    const uf = document.getElementById("input_uf");
    const cidade = document.getElementById("input_cidade");

    if(cep != false && cep != undefined){
        fetch(`https://cdn.apicep.com/file/apicep/${cep}.json`)
        .then((response) => {
            response.json().then((dados) => {
                rua.value = dados.address;
                bairro.value = dados.district;
                uf.value = dados.state;
                cidade.value = dados.city;
            })
        })
    }else {
        rua.value = "";
        bairro.value = "";
        uf.value = "";
        cidade.value = "";
    }
}

function navegar(v){
    if(v == 1){
        informacoes_empresa.style.display = "none";
        informacoes_usuario.style.display = "flex";
    }else {
        informacoes_empresa.style.display = "flex";
        informacoes_usuario.style.display = "none";
    }
}



