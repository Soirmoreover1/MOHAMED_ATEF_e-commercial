const express = require('express');
const router = express.Router();
const _ = require('lodash')
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utli = require('util');
const asyncsign = utli.promisify(jwt.sign);
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');


// Add a product to the cart
router.post('/add/:userId',async (req, res) => {
    try {
      const cartItem = new CartItem({
        userId: req.params.id,
        productId: req.body.productId,
        quantity: req.body.quantity
      });
  
      await cartItem.save();
      res.status(201).json({ message: 'Product added to cart.' });
    
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  });

// Get user's cart
router.get('/show/:userId',authorized,async (req, res) => {
    try {
      const cartItems = await CartItem.find({ userId: req.params.id }).populate('productId');
      res.send(cartItems).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  });



  router.delete('/delete/:userId',authorized, async (req, res) => {
    try {
      await CartItem.findByIdAndDelete(req.params.userId);
      res.json({ message: 'cart deleted.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  });
  

module.exports = router;