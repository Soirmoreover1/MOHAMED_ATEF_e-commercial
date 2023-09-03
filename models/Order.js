const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
});

module.exports = mongoose.model('Order', orderSchema);