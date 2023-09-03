const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
// get all users
router.get('/showusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

//delete users by id
router.delete('/users/:userId',adminauthorized, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});






// Get all products
router.get('/showproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a product
router.post('/create',adminauthorized, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity
    });

    await product.save();
    res.status(201).send(product).json({ message: 'Product created.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a product
router.patch('/edit/:productId',adminauthorized, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.productId, req.body);
  
    res.json({ message: 'Product updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a product
router.delete('/delete/:productId', adminauthorized, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: 'product deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;