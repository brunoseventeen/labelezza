function confirmarPedido() {
    let pedido = [];

    if (document.getElementById('entrada1').checked) pedido.push('Salada Caesar');
    if (document.getElementById('entrada2').checked) pedido.push('Bruschetta');
    if (document.getElementById('prato1').checked) pedido.push('Picanha');
    if (document.getElementById('prato2').checked) pedido.push('Frango Grelhado');
    if (document.getElementById('bebida1').checked) pedido.push('Suco Natural');
    if (document.getElementById('bebida2').checked) pedido.push('Refrigerante');

    if (pedido.length > 0) {
        alert('Pedido confirmado: ' + pedido.join(', '));
    } else {
        alert('Nenhum item selecionado.');
    }
}


