function liberar() {
    let htmlContent = ''; // Inicializa uma string para armazenar o conteúdo HTML

    for (let i = 1; i <= 25; i++) {
        const mesa = document.getElementById(`mesa${i}`); // Captura cada mesa pelo ID

        if (mesa && mesa.classList.contains('disabled')) {
            htmlContent += `<p class="paragrafo-mesas">Mesa ${i} <button class="lib1" onclick="lib(${i})">Liberar</button></p>`;
        }
    }

    if (htmlContent) {
        document.getElementById("mesasusadas").innerHTML = htmlContent; // Atualiza o conteúdo da div
    } else {
        alert('Nenhuma mesa desativada encontrada.');
    }
}


function mesa (num) {
    const cliente = prompt('ola')
    if (cliente !== null) {
        localStorage.setItem('cliente',cliente)
        alert('cliente registrado: ' + cliente + ' na mesa '+num);
        const mesabt = document.getElementById("mesa"+num)
        mesabt.disabled = true
        mesabt.classList.add('disabled')
    } else {
        alert('Entrada cancelada.');
    }
}
function lib(num) {
    const mesa = document.getElementById('mesa'+num);
    
    // Verifica se a classe 'disable' está presente
    if (mesa.classList.contains('disabled')) {
        mesa.classList.remove('disabled'); // Remove a classe 'disable'
        alert('Mesa '+num+' liberada!');
        mesa.disabled = false
    } else {
        alert('A mesa não possui a classe "disable".');
    }
    document.getElementById("mesasusadas").innerText = ""
}