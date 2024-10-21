let totalpedidos = 0;
let totalrecebido = 0;

document.getElementById('confirmar').addEventListener('click', function() {
    const orderNumber = document.getElementById('order-number').value;
    const totalAmount = parseFloat(document.getElementById('total-amount').value);
    const paymentMethod = document.getElementById('payment-method').value;
    let troco = 0;

    if (orderNumber && totalAmount > 0) {
        totalpedidos++;
        totalrecebido += totalAmount;

        // Verificar forma de pagamento
        if (paymentMethod === 'dinheiro') {
            const cashReceived = parseFloat(document.getElementById('cash-received').value);

            if (cashReceived && cashReceived >= totalAmount) {
                troco = cashReceived - totalAmount;
            } else {
                alert('O valor recebido deve ser maior ou igual ao valor total.');
                return;
            }
        }

        // Atualizar resumo do caixa
        document.getElementById('total-pedidos').innerText = totalpedidos;
        document.getElementById('total-recebido').innerText = totalrecebido.toFixed(2);
        document.getElementById('troco').innerText = troco.toFixed(2);

        // Limpar formulário
        document.getElementById('payment-form').reset();
        document.getElementById('cash-payment-section').style.display = 'none';
    } else {
        alert('Insira um número de pedido válido e o valor.');
    }
});

// Exibir campo de valor recebido se a forma de pagamento for "Dinheiro"
document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = document.getElementById('payment-method').value;
    if (paymentMethod === 'dinheiro') {
        document.getElementById('cash-payment-section').style.display = 'block';
    } else {
        document.getElementById('cash-payment-section').style.display = 'none';
    }
});

// Simula a busca do valor total ao inserir o número do pedido
document.getElementById('order-number').addEventListener('change', function() {
    const orderNumber = document.getElementById('order-number').value;

    // Simulação: busca do valor de acordo com o pedido (apenas exemplo)
    const mockValues = {
        1: 100.50,
        2: 75.00,
        3: 50.75
    };

    if (mockValues[orderNumber]) {
        document.getElementById('total-amount').value = mockValues[orderNumber];
    } else {
        document.getElementById('total-amount').value = '';
    }
});
