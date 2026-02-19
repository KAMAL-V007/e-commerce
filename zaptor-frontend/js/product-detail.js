document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: 'Ethiopian Yirgacheffe',
            price: 20,
            image: 'images/coffee1.jpg',
            description: 'A fragrant and floral coffee with a complex flavor profile.'
        },
        {
            id: 2,
            name: 'Colombian Supremo',
            price: 18,
            image: 'images/coffee2.jpg',
            description: 'A classic coffee with a rich, nutty flavor and a smooth finish.'
        },
        {
            id: 3,
            name: 'Guatemalan Antigua',
            price: 22,
            image: 'images/coffee3.jpg',
            description: 'A full-bodied coffee with a spicy and smoky flavor.'
        },
        {
            id: 4,
            name: 'Sumatra Mandheling',
            price: 25,
            image: 'images/coffee4.jpg',
            description: 'A dark and earthy coffee with a low acidity.'
        },
        {
            id: 5,
            name: 'Kenyan AA',
            price: 24,
            image: 'images/coffee5.jpg',
            description: 'A bright and fruity coffee with a wine-like acidity.'
        },
        {
            id: 6,
            name: 'Costa Rican Tarrazu',
            price: 21,
            image: 'images/coffee6.jpg',
            description: 'A well-balanced coffee with a clean and crisp flavor.'
        }
    ];

    const productContent = document.getElementById('product-content');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product && productContent) {
        productContent.innerHTML = `
            <div class="product-detail-layout">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    <p class="price">$${product.price}</p>
                    <p>${product.description}</p>
                    <button id="add-to-cart" class="btn">Add to Cart</button>
                </div>
            </div>
        `;

        const addToCartButton = document.getElementById('add-to-cart');
        addToCartButton.addEventListener('click', () => {
            addToCart(product);
        });
    } else {
        productContent.innerHTML = '<p>Product not found.</p>';
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
}