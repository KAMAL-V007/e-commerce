document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: 'Ethiopian Yirgacheffe',
            price: 20,
            image: 'images/coffee1.jpg'
        },
        {
            id: 2,
            name: 'Colombian Supremo',
            price: 18,
            image: 'images/coffee2.jpg'
        },
        {
            id: 3,
            name: 'Guatemalan Antigua',
            price: 22,
            image: 'images/coffee3.jpg'
        },
        {
            id: 4,
            name: 'Sumatra Mandheling',
            price: 25,
            image: 'images/coffee4.jpg'
        },
        {
            id: 5,
            name: 'Kenyan AA',
            price: 24,
            image: 'images/coffee5.jpg'
        },
        {
            id: 6,
            name: 'Costa Rican Tarrazu',
            price: 21,
            image: 'images/coffee6.jpg'
        }
    ];

    const productGrid = document.querySelector('.product-grid');

    if (productGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
            `;
            productGrid.appendChild(productCard);
        });
    }
});