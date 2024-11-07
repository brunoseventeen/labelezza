function liberar() {
    let htmlContent = ''; // Inicializa uma string para armazenar o conteúdo HTML

    for (let i = 1; i <= 25; i++) {
        const mesa = document.getElementById(`mesa${i}`); // Captura cada mesa pelo ID
        const mesaEstado = localStorage.getItem(`mesa${i}`); // Recupera o estado da mesa

        if (mesa && mesaEstado === 'disabled') {
            htmlContent += `<p class="paragrafo-mesas">Mesa ${i} <button class="lib1" onclick="lib(${i})">Liberar</button></p>`;
        }
    }

    if (htmlContent) {
        document.getElementById("mesasusadas").innerHTML = htmlContent; // Atualiza o conteúdo da div
    } else {
        alert('Nenhuma mesa desativada encontrada.');
    }
}

function voltar() {
    document.getElementById("telarecepcao").style.display = "none";
    document.getElementById("telaprincipal").style.display = "block";
}

function mesa(num) {
    let cliente = '';
    while (!cliente) { // Continua pedindo até que o usuário insira algo
        cliente = prompt('Digite o seu CPF');
        if (cliente === null) {
            alert('Entrada cancelada.');
            return; // Encerra a função se o usuário cancelar
        }
    }

    // Recupera o array de registros de CPFs e mesas, ou cria um novo array se não existir
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Adiciona o novo registro (CPF e mesa) ao array
    registros.push({ cpf: cliente, mesa: num });

    // Armazena o array atualizado no localStorage
    localStorage.setItem('registros', JSON.stringify(registros));

    alert('Cliente registrado: ' + cliente + ' na mesa ' + num);
    const mesabt = document.getElementById("mesa" + num);
    mesabt.disabled = true;
    mesabt.classList.add('disabled');
    localStorage.setItem(`mesa${num}`, 'disabled'); // Salva o estado da mesa como desativada
}

function lib(num) {
    const mesa = document.getElementById('mesa' + num);

    // Verifica se a classe 'disabled' está presente
    if (mesa.classList.contains('disabled')) {
        mesa.classList.remove('disabled'); // Remove a classe 'disabled'
        alert('Mesa ' + num + ' liberada!');
        mesa.disabled = false;
        localStorage.removeItem(`mesa${num}`); // Remove o estado da mesa

        // Recupera o array de registros de CPFs e mesas
        let registros = JSON.parse(localStorage.getItem('registros')) || [];

        // Filtra o array para remover o registro da mesa liberada
        registros = registros.filter(registro => registro.mesa !== num);

        // Atualiza o localStorage com o array filtrado
        localStorage.setItem('registros', JSON.stringify(registros));
    } else {
        alert('A mesa não possui a classe "disabled".');
    }
    document.getElementById("mesasusadas").innerText = "";
}


// Função para carregar o estado das mesas ao iniciar
function carregarEstadoMesas() {
    for (let i = 1; i <= 25; i++) {
        const mesa = document.getElementById(`mesa${i}`);
        const mesaEstado = localStorage.getItem(`mesa${i}`); // Recupera o estado da mesa

        if (mesaEstado === 'disabled') {
            mesa.classList.add('disabled'); // Adiciona a classe 'disabled'
            mesa.disabled = true; // Desabilita a mesa
        }
    }
}

// Chame a função ao carregar a página
window.onload = carregarEstadoMesas;
