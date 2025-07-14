let cart = JSON.parse(localStorage.getItem('shopping')) || [];

function saveCart() {
    localStorage.setItem('shopping', JSON.stringify(cart));
}

function updateCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = count;
    }
}

function renderCart() {
    const cartBody = document.querySelector('.cart-body');
    const cartTotal = document.querySelector('.cart-total');

    updateCount();

    if (!cartBody || !cartTotal) return;

    if (cart.length === 0) {
        cartBody.innerHTML = '<p>Giỏ hàng vẫn còn trống</p>';
        cartTotal.textContent = '0đ';
        return;
    }

    let html = '<ul>';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `<li class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <input type="text" class="cart-item-quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                    <span class="cart-item-price">x ${item.price.toLocaleString()}đ</span>
                </div>
            </div>
            <span class="cart-item-total">${itemTotal.toLocaleString()}đ</span>
            <i class="fa-thin fa-xmark remove-item-btn" data-id="${item.id}"></i>
        </li>`;
    });

    html += '</ul>';
    cartBody.innerHTML = html;
    cartTotal.textContent = total.toLocaleString() + 'đ';
}

function addToCart(id, name, price, image) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            image: image,
        });
    }
    saveCart();
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const cartBody = document.querySelector('.cart-body');
    if (cartBody) {
        cartBody.addEventListener('click', (e) => {
            const target = e.target;
            const id = target.dataset.id;
            if (!id) return;

            const productIndex = cart.findIndex(item => item.id === id);
            if (productIndex === -1) return;

            let needsUpdate = false;

            if (target.classList.contains('plus-btn')) {
                cart[productIndex].quantity += 1;
                needsUpdate = true;
            } else if (target.classList.contains('minus-btn')) {
                cart[productIndex].quantity -= 1;
                if (cart[productIndex].quantity <= 0) {
                    cart.splice(productIndex, 1);
                }
                needsUpdate = true;
            } else if (target.classList.contains('remove-item-btn')) {
                cart.splice(productIndex, 1);
                needsUpdate = true;
            }

            if (needsUpdate) {
                saveCart();
                renderCart();
            }
        });
    }
});

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const { id, name, price, image } = button.dataset;

        if (!id || !name || !price || !image) {
            console.error('Product button is missing data attributes:', button);
            return;
        }

        addToCart(id, name, Number(price), image);
    });
});


