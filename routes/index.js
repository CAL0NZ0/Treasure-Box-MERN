const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Welcome page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) =>
	res.render('dashboard', {
		user: req.user,
	})
);

//Treasures page
router.get('/treasures', (req, res) => {
	res.sendFile(__dirname +'/treasures.html');
});

//Cart page
router.get('/cart', (req, res) => {
  res.sendFile(__dirname +'/cart.html');
})

module.exports = router;
