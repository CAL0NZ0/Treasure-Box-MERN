const { CosmosClient } = require('@azure/cosmos');
const config = require('./config.js');
const endpoint = config.endpoint;
const key = config.key;

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
	async function main() {
		const client = new CosmosClient({ endpoint, key });
		const database = client.database('treasure_box');
		const container = database.container('store_items');

		const { resources: storeItems } = await container.items
			.query('Select * from c ORDER BY c.price ASC')
			.fetchAll();

		const items = JSON.parse(JSON.stringify(storeItems));
		const products = document.getElementById('products');
		items.forEach((item) => {
			let itemContent = `<div class="product-img-div"><img class="product-img" style="width: 200px;height: 200px;" src = "${item.img}"></div>
            <div class="product-info">
                <p class="fs-3 d-flex justify-content-center align-items-center product-name">${item.name}</p>
                <p class="fs-4 product-price">${item.price}</p><button class="btn btn-warning active btn-add" type="button">Add to Cart</button>
            </div>`;

			let card = document.createElement('div');
			card.id = 'product-card';
			card.innerHTML = itemContent;
			products.append(card);

			Array.from(document.getElementsByClassName('btn-add')).forEach((btn) => {
				btn.addEventListener('click', addToCartClicked);
			});
		});
	}
	main();
}

function addToCartClicked(event) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	let button = event.target;
	let productCard = button.parentElement.parentElement;
	let getName = productCard.getElementsByClassName('product-name')[0].innerHTML;
	let getPrice =
		productCard.getElementsByClassName('product-price')[0].innerHTML;
	let getImg = productCard.getElementsByClassName('product-img')[0].src;

	let newItem = {
		name: getName,
		price: getPrice,
		img: getImg,
	};

	let nameExist = cart.some((obj) => obj.name === newItem.name);
	if (!nameExist) {
		cart.push(newItem);
		localStorage.setItem('cart', JSON.stringify(cart));
	} else {
		alert('Already added! Edit in cart page.');
	}
}
