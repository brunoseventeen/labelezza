document.addEventListener("DOMContentLoaded", carregarDados);

function carregarDados() {
    const tipos = ["comidas", "bebidas", "sobremesas"];
    tipos.forEach(tipo => {
        const dados = JSON.parse(localStorage.getItem(tipo)) || [];
        dados.forEach(item => adicionarItemTabela(tipo.replace('s', ''), item.nome, item.valor));
    });
}

function adicionarcomida() {
    const nome = document.getElementById("nomecomida").value;
    const valor = document.getElementById("valorcomida").value;
    const tipodecomida = document.getElementById("tipodecomida").value;

    if (nome && valor) {
        adicionarItemTabela(tipodecomida, nome, valor);
        salvarDados(tipodecomida, nome, valor);
        // Limpar campos após adicionar
        document.getElementById("nomecomida").value = '';
        document.getElementById("valorcomida").value = '';
    }
}

function adicionarItemTabela(tipo, nome, valor) {
    const tbody = document.getElementById(`${tipo}sviw`);
    
    if (!tbody) {
        console.error(`Tabela não encontrada para o tipo: ${tipo}`);
        return;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nome}</td>
        <td>${valor}</td>
        <td>
            <button onclick="editarItem(this)">Editar</button>
            <button onclick="excluirItem(this)">Excluir</button>
        </td>
    `;
    tbody.appendChild(row);
}

function salvarDados(tipo, nome, valor) {
    const dados = JSON.parse(localStorage.getItem(`${tipo}s`)) || [];
    dados.push({ nome, valor });
    localStorage.setItem(`${tipo}s`, JSON.stringify(dados));
}

function editarItem(button) {
    const row = button.parentElement.parentElement;
    const nome = row.children[0].innerText;
    const valor = row.children[1].innerText;
    const tipo = row.parentElement.id.replace('viw', '');

    document.getElementById("nomecomida").value = nome;
    document.getElementById("valorcomida").value = valor;
    document.getElementById("tipodecomida").value = tipo;

    excluirItem(button); // Remove o item para editar
}

function excluirItem(button) {
    const row = button.parentElement.parentElement;
    const tipo = row.parentElement.id.replace('viw', '');
    const nome = row.children[0].innerText;
    const valor = row.children[1].innerText;

    row.remove(); // Remove da tabela
    removerDados(tipo, nome, valor); // Remove do localStorage
}

function removerDados(tipo, nome, valor) {
    const dados = JSON.parse(localStorage.removeItem(`${tipo}s`)) || [];
    const novosDados = dados.filter(item => !(item.nome === nome && item.valor === valor));
    localStorage.removeItem(`${tipo}s`, JSON.stringify(novosDados));
}