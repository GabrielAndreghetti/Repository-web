document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário até que tudo esteja validado.
    validateForm();
});

function validateForm() {
    var firstName = document.getElementById('firstName').value.trim();
    var birthYear = document.getElementById('birthYear').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();
    var message = document.getElementById('message');

    // Validar Primeiro Nome
    if (!/^[A-Za-z ]{7,}$/.test(firstName)) {
        message.textContent = 'Nome deve conter apenas letras e ter mais de 6 caracteres.';
        return false;
    }

    // Validar Ano de Nascimento
    if (birthYear < 1900 || birthYear > 2022) {
        message.textContent = 'Ano de nascimento deve estar entre 1900 e 2022.';
        return false;
    }

    // Validar Email
    var emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    if (!emailRegex.test(email)) {
        message.textContent = 'Email inválido.';
        return false;
    }

    // Validar e classificar Senha
    if (!validarSenha(password, firstName, birthYear)) {
        return false;
    }

    // Se todas as validações passarem
    message.textContent = 'Formulário enviado com sucesso!';
    return true; //
}

function validarSenha(senha, nome, ano) {
    const senhaMeter = document.getElementById("passStrengthMeter");
    const senhaHelp = document.getElementById("senhaHelp");
    const regexSenhaBasica = /^(?=.*[!@#%&+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;

    // Reseta o medidor para o estado inicial
    senhaMeter.value = 0;
    senhaMeter.style.backgroundColor = "#ff3e3e"; // Vermelho para senha inválida

    // Verifica se a senha é válida
    if (!senha.match(regexSenhaBasica) || senha.includes(nome) || senha.includes(ano)) {
        senhaHelp.textContent = "Senha inválida. Não deve conter seu nome ou ano de nascimento, e deve incluir letras, números e caracteres especiais.";
        senhaHelp.style.color = "red";
        return false;
    }

    // Senha válida, proceder com a classificação
    senhaHelp.textContent = "";
    classificarSenha(senha, senhaMeter, senhaHelp);
    return true;
}

function classificarSenha(senha, senhaMeter, senhaHelp) {
    const numCaracteresEspeciais = (senha.match(/[!@#%&+]/g) || []).length;
    const numNumeros = (senha.match(/\d/g) || []).length;
    const numLetrasMaiusculas = (senha.match(/[A-Z]/g) || []).length;

    let forca = 0;
    let cor = "#ff3e3e"; // Vermelho padrão

    if (senha.length < 8 && numCaracteresEspeciais >= 1 && numNumeros >= 1) {
        forca = 10; // Senha fraca
        cor = "#ff3e3e"; // Vermelho
    } else if (senha.length >= 8 && numCaracteresEspeciais >= 1 && numNumeros >= 1 && numLetrasMaiusculas >= 1) {
        forca = 20; // Senha moderada
        cor = "#ffa500"; // Laranja
    } else if (senha.length > 12 && numCaracteresEspeciais > 1 && numNumeros > 1 && numLetrasMaiusculas > 1) {
        forca = 30; // Senha forte
        cor = "#32CD32"; // Verde
    } else {
        senhaHelp.textContent = "Senha inválida.";
        senhaHelp.style.color = "red";
        return false;
    }

    // Atualiza a visualização do medidor de senha
    senhaMeter.value = forca;
    senhaMeter.style.backgroundColor = cor;
    senhaHelp.textContent = "Força da senha: " + (forca === 10 ? "fraca" : forca === 20 ? "moderada" : "forte");
    senhaHelp.style.color = "green";
    return true;
}
