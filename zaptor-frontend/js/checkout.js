document.addEventListener('DOMContentLoaded', () => {
    const orderSummaryItems = document.getElementById('order-summary-items');
    const orderSummaryTotal = document.getElementById('order-summary-total');
    const checkoutForm = document.getElementById('checkout-form');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayOrderSummary() {
        orderSummaryItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            orderSummaryItems.innerHTML = '<p>Your cart is empty.</p>';
            orderSummaryTotal.innerHTML = '';
            checkoutForm.style.display = 'none';
            return;
        }

        cart.forEach(item => {
            const summaryItem = document.createElement('div');
            summaryItem.classList.add('summary-item');
            summaryItem.innerHTML = `
                <p>${item.name} x ${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            `;
            orderSummaryItems.appendChild(summaryItem);
            total += item.price * item.quantity;
        });

        orderSummaryTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate a successful order
            localStorage.removeItem('cart');
            alert('Your order has been placed successfully!');
            window.location.href = 'index.html';
        });
    }

    displayOrderSummary();
});