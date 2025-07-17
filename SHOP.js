let cartCount = 0;
let cart = [];

// Function to handle add to cart button click
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;
        const productName = product.querySelector('h2').innerText;
        const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));
        const cartItem = cart.find(item => item.name === productName);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        updateCartCount();
        updateButton(this, productName);
    });
});

// Function to update cart count
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-button').innerText = `Cart (${cartCount})`;
}

// Function to update the button text
function updateButton(button, productName) {
    const cartItem = cart.find(item => item.name === productName);
    if (cartItem) {
        button.innerHTML = `
            <button class="decrement">-</button>
            Added (${cartItem.quantity})
            <button class="increment">+</button>
        `;
        button.querySelector('.decrement').addEventListener('click', function(event) {
            event.stopPropagation();
            decrementItem(productName);
        });
        button.querySelector('.increment').addEventListener('click', function(event) {
            event.stopPropagation();
            incrementItem(productName);
        });
    }
}

// Function to increment item quantity
function incrementItem(productName) {
    const cartItem = cart.find(item => item.name === productName);
    if (cartItem) {
        cartItem.quantity += 1;
        updateCartCount();
        updateAllButtons();
    }
}

// Function to decrement item quantity
function decrementItem(productName) {
    const cartItem = cart.find(item => item.name === productName);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        }
        updateCartCount();
        updateAllButtons();
    }
}

// Function to update all buttons
function updateAllButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        const product = button.parentElement;
        const productName = product.querySelector('h2').innerText;
        updateButton(button, productName);
    });
}

// Function to handle cart button click
document.querySelector('.cart-button').addEventListener('click', function() {
    updateCartModal();
    document.getElementById('cart-modal').style.display = 'block';
});

// Function to update the cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous items
    let totalCost = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItems.appendChild(li);
        totalCost += item.price * item.quantity;
    });
    const totalCostElement = document.createElement('li');
    totalCostElement.innerText = `Total Cost: $${totalCost.toFixed(2)}`;
    cartItems.appendChild(totalCostElement);

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            removeItem(productName);
        });
    });
}

// Function to remove item from cart
function removeItem(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartCount();
    updateAllButtons();
    updateCartModal(); // Update the cart modal without closing it
}

// Function to close the cart modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
});

// Function to handle checkout button click
document.querySelector('.checkout-button').addEventListener('click', function() {
    alert('Proceeding to checkout...');
    // You can add further checkout logic here
});