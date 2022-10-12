const { CosmosClient } = require('@azure/cosmos');
const config = require('./config.js');
const endpoint = config.endpoint;
const key = config.key;
const username = document.getElementsByClassName('username');
const password = document.getElementsByClassName('password');

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
  Array.from(document.getElementsByClassName("submit-btn")).forEach((btn) => {
    btn.addEventListener("click", register);
  });
}

async function register() {		
		const client = new CosmosClient({ endpoint, key });
		const database = client.database('treasure_box');
		const container = database.container('logins');

		const { resources: logins } = await container.items
			.query('Select * from c')
			.fetchAll();

		const loginInfo = JSON.parse(JSON.stringify(logins));
		loginInfo.forEach((info) => {
      if (username in info) {
        alert("Already registered! Please, login")
      }
		});
	}