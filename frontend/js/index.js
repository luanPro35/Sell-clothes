function renderCart() {
    const cart = JSON.parse(localStorage.getItem('shopping')) || [];
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
        html += `
            <li class="cart-item">
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
            </li>
        `;
    });

    html += '</ul>';

    cartBody.innerHTML = html;
    cartTotal.textContent = total.toLocaleString() + 'đ';

}


document.querySelectorAll('.btn-primary, .btn-more').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        if (!id || !name || isNaN(price)) {
            return;
        }

        let cart = JSON.parse(localStorage.getItem('shopping')) || [];

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
        console.log("Những sản phẩm trong giỏ hàng:", cart);
        console.log({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            image: image,
        })
        localStorage.setItem('shopping', JSON.stringify(cart));
        renderCart();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    document.querySelector('.cart-body').addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        let cart = JSON.parse(localStorage.getItem('shopping')) || [];
        const product = cart.find(item => item.id === id);
        if (!product) return;

        if (e.target.classList.contains('plus-btn')) {
            product.quantity++;
        } else if (e.target.classList.contains('minus-btn')) {
            product.quantity--;
        } else if (e.target.classList.contains('remove-item-btn')) {
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('shopping', JSON.stringify(cart));
            renderCart();
            return;
        }

        if (product && product.quantity < 1) {
            cart = cart.filter(item => item.id !== id);
        }

        localStorage.setItem('shopping', JSON.stringify(cart));
        renderCart();
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('shopping')) || [];
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống!');
                return;
            }

            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
            });

            alert(`Tổng số tiền của bạn là ${total.toLocaleString()}đ. Cảm ơn bạn đã mua sắm!`);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            localStorage.removeItem('shopping');
            renderCart();
        });
    }

    const carousel = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    if (carousel && track && prevBtn && nextBtn) {
        let product_cards = Array.from(track.children);
        const slideWidth = product_cards[0].getBoundingClientRect().width;
        const visibleSlides = Math.floor(carousel.offsetWidth / slideWidth);

        const clonesStart = product_cards.slice(-visibleSlides).map(card => card.cloneNode(true));
        const clonesEnd = product_cards.slice(0, visibleSlides).map(card => card.cloneNode(true));

        clonesStart.forEach(clone => track.insertBefore(clone, product_cards[0]));
        clonesEnd.forEach(clone => track.appendChild(clone));

        // Update product_cards to include clones
        product_cards = Array.from(track.children);

        let currentIndex = visibleSlides;
        let isTransitioning = false;

        function setPosition() {
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        function slide(direction) {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex += direction;
            track.style.transition = 'transform 0.5s ease-in-out';
            setPosition();
        }

        track.addEventListener('transitionend', () => {
            if (currentIndex <= visibleSlides - 1) {
                track.style.transition = 'none';
                currentIndex = product_cards.length - 2 * visibleSlides;
                setPosition();
            }

            if (currentIndex >= product_cards.length - visibleSlides) {
                track.style.transition = 'none';
                currentIndex = visibleSlides;
                setPosition();
            }
            isTransitioning = false;
        });

        prevBtn.addEventListener('click', () => slide(-1));
        nextBtn.addEventListener('click', () => slide(1));

        // Initial position
        setPosition();
    }
});

function updateCount() {
    const cart = JSON.parse(localStorage.getItem('shopping')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}
