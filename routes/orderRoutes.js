const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const {authorized , adminauthorized} = require('../middlewares/authenticate');

// Verify order
router.post('/verify',authorized, async (req, res) => {
    try {
      const order = new Order({
        userId: req.user._id,
        cartItems: req.body.cartItems
      });
  
      await order.save();
      res.status(201).json({ message: 'Order verified.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  });

// Cancel order
router.post('/cancel', authorized , async (req, res) => {
    try {
      await Order.deleteOne({ userId: req.user._id, _id: req.body.orderId });
      res.json({ message: 'Order cancelled.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  });

module.exports = router;