document.addEventListener("DOMContentLoaded", carregarDados);

function carregarDados() {
    const tipos = ["comidas", "bebidas", "sobremesas"];
    tipos.forEach(tipo => {
        const dados = JSON.parse(localStorage.getItem(tipo)) || [];
        dados.forEach(item => adicionarItemTabela(tipo, item.nome, item.valor));
    });
}

function adicionarItemTabela(tipo, nome, valor) {
    const tbody = document.getElementById(tipo);
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nome}</td>
        <td>${valor}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="adicionarAoPedido('${nome}', ${valor})">Adicionar ao Pedido</button>
        </td>
    `;
    tbody.appendChild(row);
}

let total = 0;
let itensPedido = [];

function adicionarAoPedido(nome, valor) {
    total += valor; // Adiciona o valor ao total

    // Adiciona o item ao pedido
    itensPedido.push({ nome, valor });

    atualizarTotal(); // Atualiza a exibição do total
    exibirItensPedido(); // Exibe os itens adicionados ao pedido
}

function atualizarTotal() {
    document.querySelector("#totalDisplay").innerHTML = total.toFixed(2).replace('.', ',');
}

function exibirItensPedido() {
    const container = document.getElementById("telo");
    container.innerHTML = ''; // Limpa o conteúdo anterior

    itensPedido.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "row";
        itemDiv.innerHTML = `<div class="col">${item.nome}</div><div class="col">${item.valor.toFixed(2).replace('.', ',')}</div>`;
        container.appendChild(itemDiv);
    });
}

function finalizarPedido() {
    alert(`Pedido finalizado!\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`);
    
    // Resetar total e itensPedido
    total = 0;
    itensPedido = [];
    
    atualizarTotal(); // Atualiza a exibição do total
    exibirItensPedido(); // Limpa os itens exibidos
}

