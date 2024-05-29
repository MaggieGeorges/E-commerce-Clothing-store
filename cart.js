let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCarItems = () => {
    if (basket.length !== 0) {
        ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id);
            if (!search) return ''; // Skip items with invalid IDs
            let { img, name, price } = search;
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
                        </div>
                        <div class="buttons">
                            <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                        </div>
                        <h3>$ ${item * price}</h3>
                    </div>
                </div>
            `;
        }).join("");
    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
    }
};
generateCarItems();

let increment = (id) => {
    let selectedItem = basket.find((x) => x.id === id);
    if (selectedItem === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        selectedItem.item += 1;
    }
    generateCarItems();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = basket.find((x) => x.id === id);
    if (selectedItem === undefined) return;
    if (selectedItem.item === 0) return;
    selectedItem.item -= 1;
    if (selectedItem.item === 0) {
        basket = basket.filter((x) => x.id !== id);
    }
    generateCarItems();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let selectedItem = basket.find((x) => x.id === id);
    if (selectedItem) {
        document.getElementById(id).innerHTML = selectedItem.item;
        calculation();
        TotalAmount();
    }
};

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCarItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCarItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id);
            return search ? item * search.price : 0;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class="checkout" onclick="checkout()">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else {
        label.innerHTML = ``;
    }
};

TotalAmount();

// Function to get user details
function getUserDetails() {
  return JSON.parse(localStorage.getItem('userDetails'));
}


let checkout = () => {
    const userDetails = getUserDetails();
    if (!userDetails) {
        alert('User not logged in');
        return;
    }

    if (basket.length === 0) {
        alert('Cart is empty');
        return;
    }

    let amount = basket.map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id);
        return search ? item * search.price : 0;
    }).reduce((x, y) => x + y, 0);

    const order = {
        userId: userDetails.id,
        username: userDetails.username,
        total: amount,
        items: basket
    };

    fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => {
        alert('Order placed successfully');
        // Clear the cart after successful order
        clearCart(); 
        // Redirect to home page
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again later.');
    });
};
