document.addEventListener("DOMContentLoaded", carregarPedidos);

function carregarPedidos() {
    // Tentar ler os pedidos salvos no localStorage
    const pedidos = JSON.parse(localStorage.getItem("pedidosCozinheiro")) || [];
    const pedidos = JSON.parse(localStorage.getItem("registros")) || [];
    const pedidoContainer = document.getElementById("pedidosContainer");

    pedidoContainer.innerHTML = ''; // Limpar conteúdo anterior

    if (pedidos.length > 0) {
        // Agrupar pedidos por mesa
        const mesas = groupByMesa(pedidos);

        mesas.forEach(mesa => {
            // Criar a div principal para a mesa
            const divMesa = document.createElement("div");
            divMesa.className = "mesa-container mb-4";

            // Adicionar o título com o CPF e número da mesa
            const divHeader = document.createElement("div");
            divHeader.className = "mesa-header p-3 bg-light rounded";
            divHeader.innerHTML = `
                <h5>CPF: ${mesa.cpf} - Mesa: ${mesa.mesa}</h5>
            `;
            divMesa.appendChild(divHeader);

            // Criar os cards com os pedidos para essa mesa
            mesa.pedidos.forEach(pedido => {
                adicionarPedidoAoContainer(pedido, divMesa);
            });

            // Adicionar a div da mesa no container geral
            pedidoContainer.appendChild(divMesa);
        });
    } else {
        pedidoContainer.innerHTML = '<p>Nenhum pedido disponível.</p>'; // Caso não haja pedidos
    }
}

// Função para agrupar os pedidos por mesa
function groupByMesa(pedidos) {
    const mesas = [];

    pedidos.forEach(pedido => {
        // Verificar se já existe um grupo para a mesa
        const mesaExistente = mesas.find(mesa => mesa.mesa === pedido.mesa);
        
        if (mesaExistente) {
            mesaExistente.pedidos.push(pedido);
        } else {
            mesas.push({
                mesa: pedido.mesa,
                cpf: pedido.cpf,
                pedidos: [pedido]
            });
        }
    });

    return mesas;
}

function adicionarPedidoAoContainer(pedido, divMesa) {
    const pedidoDiv = document.createElement("div");
    pedidoDiv.className = "pedido-item mb-3 p-3 border rounded";

    // Criar HTML para os itens do pedido
    const itensHTML = pedido.itens.map(item => `
        <div class="row">
            <div class="col">${item.nome}</div>
            <div class="col">${item.valor.toFixed(2).replace('.', ',')}</div>
        </div>
    `).join('');

    pedidoDiv.innerHTML = `
    <h5>Pedido ID: ${pedido.id} </h5>
    <div>${itensHTML}</div>
        <div>Total: ${pedido.total.toFixed(2).replace('.', ',')} R$</div>
        <p>Status: ${pedido.status}</p>
    `;
    
    divMesa.appendChild(pedidoDiv);
}
function sairDaMesa(mesaNumero) {
    // Pegar os pedidos salvos no localStorage
    const pedidos = JSON.parse(localStorage.getItem("pedidosCozinheiro")) || [];

    // Filtrar os pedidos para remover os da mesa selecionada
    const pedidosAtualizados = pedidos.filter(pedido => pedido.mesa !== mesaNumero);

    // Atualizar o localStorage com a nova lista de pedidos
    localStorage.setItem("pedidosCozinheiro", JSON.stringify(pedidosAtualizados));

    // Recarregar os pedidos na tela para refletir as mudanças
    carregarPedidosNaRecepcao();

    alert("Pedidos da mesa apagados!");
}
// - Mesa: ${pedido.mesa}
