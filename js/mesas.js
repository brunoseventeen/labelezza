function liberar () {
    const mesa1 = document.getElementById('mesa1')
    if (mesa1.classList.contains('disabled')) {
        document.getElementById("mesasusadas").innerHTML = `<p class="paragrafo-mesas">Mesa 1 <button class="lib1" onclick="lib1()">Liberar</button></p>`
    }
    else {
        alert('A div não possui a classe "ativo".');
    }
}
function lib1() {
    const mesa1 = document.getElementById('mesa1');
    
    // Verifica se a classe 'disable' está presente
    if (mesa1.classList.contains('disabled')) {
        mesa1.classList.remove('disabled'); // Remove a classe 'disable'
        alert('Mesa 1 liberada!');
        mesa1.disabled = false
    } else {
        alert('A mesa não possui a classe "disable".');
    }
    document.getElementById("mesasusadas").innerText = ""
}
function mesa1 () {
    const cliente1 = prompt('ola')
    if (cliente1 !== null) {
        localStorage.setItem('cliente1',cliente1)
        alert('cliente registrado: ' + cliente1 + ' na mesa 1');
        const mesa1bt = document.getElementById("mesa1")
        mesa1bt.disabled = true
        mesa1bt.classList.add('disabled')
    } else {
        alert('Entrada cancelada.');
    }
}