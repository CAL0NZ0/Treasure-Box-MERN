if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const cartItems = document.getElementById('cart-items');

	let total = 0;

	if (cart.length) {
		cart.forEach((item) => {
			total += parseInt(item.price, 10);

			let cartRowContents = `<div class="d-flex justify-content-between align-items-center cart-row">
        <div class="cart-row-info"><img class="cart-row-img"
            src="${item.img}"></div><span
          class="fs-5 d-flex cart-row-name">${item.name}</span><span class="fs-5 cart-row-price">${item.price}</span>
        <div class="d-sm-grid d-md-grid d-lg-flex d-xl-flex d-xxl-flex"><input type="number" class="cart-row-quantity"
            min="1" value="1"><button class="btn btn-primary active d-flex btn-remove" type="button"
            style="background: var(--bs-red);border-color: #000000;margin: auto;">Remove</button></div>
      </div>`;

			let cartRow = document.createElement('div');
			cartRow.id = 'cart-row';
			cartRow.innerHTML = cartRowContents;
			cartItems.append(cartRow);
		});
	}
	updateCartTotal();
	readyCart();
}

function readyCart() {
	let removeBtn = document.getElementsByClassName('btn-remove');
	for (const btn of removeBtn) {
		let btnRemove = btn;
		btnRemove.addEventListener('click', removeCartItem);
	}

	let changeInput = document.getElementsByClassName('cart-row-quantity');
	for (const input of changeInput) {
		let inputChange = input;
		inputChange.addEventListener('change', quantityChanged);
	}

	document
		.getElementsByClassName('btn-purchase')[0]
		.addEventListener('click', purchaseClicked);
}

function removeCartItem(event) {
	let btnClick = event.currentTarget;
	btnClick.parentElement.parentElement.remove();

	let cart = JSON.parse(localStorage.getItem('cart'));
	updateCartTotal();
}

function quantityChanged(event) {
	let input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

function updateCartTotal() {
	let cartsRows = document.getElementsByClassName('cart-row');
	let total = 0;

	for (const row of cartsRows) {
		let cartRow = row;
		let priceElem = cartRow.getElementsByClassName('cart-row-price')[0];
		let quantityElem = cartRow.getElementsByClassName('cart-row-quantity')[0];
		let price = parseFloat(priceElem.innerText);
		let quantity = quantityElem.value;
		total = total + price * quantity;
	}

	document.getElementsByClassName('cart-price')[0].innerText = `${total} MIC`;
}

function purchaseClicked() {
	alert('Enjoy your Treasures!');
	let cartItems = document.getElementById('cart-items');
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}
	updateCartTotal();
	localStorage.clear();
}
