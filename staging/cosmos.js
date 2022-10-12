// Creates a access point and credentials for accessing CosmosDB
/*const { CosmosClient } = require('@azure/cosmos');
const endpoint = 'https://cal0nz0.documents.azure.com:443/';
const key =
	'HLU42pt6cpoMDvzS6Y1bjpuLWDzFtaWKVbgLaCwXG1RolPQxErQqX6387Z8dWyDVgtGvArutdERlaH0cQEaWbw==';

// Function for accessing DB and then what to do.
async function main() {
	const client = new CosmosClient({ endpoint, key });
	const database = client.database('treasure_box');
	const container = database.container('store_items');

	// Read all items from container
	const { resources: storeItems } = await container.items
		.query('Select * from c')
		.fetchAll();
	
	const items = JSON.parse(JSON.stringify(storeItems));
	console.log(items);

	// Insert items into store_items container
	const newItem = [
		{
			id: '4',
			name: 'Pokemon Booster',
			price: '50',
			img: '/img/pokemonBoosterPrize.jpg',
		},
		{
			id: '5',
			name: 'Ice Cream',
			price: '75',
			img: '/img/iceCreamPrize.jpg',
		},
		{
			id: '7',
			name: 'Coin Booster',
			price: '80',
			img: '/img/minecraftCoinsPrize.jpg',
		},
		{
			id: '8',
			name: '1,000 V-Bucks',
			price: '80',
			img: '/img/vBucks.jpg',
		},
	];
	for (const item of newItem) {
		container.items.create(item)			
	}
}
main().catch((error) => {
	console.error(error);
})*/
