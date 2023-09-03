require('./db')
const express = require('express');
const mongoose = require('mongoose');
const app = express();



app.use(express.json());

const {authorized , adminauthorized} = require('./middlewares/authenticate');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/users', userRoutes);
app.use('/products' , productRoutes);
app.use('/cart', authorized,cartRoutes);
app.use('/orders', authorized ,orderRoutes);

app.use((err , req ,res ,next)=>{
  res.status(err.status).send({
      message : err.message
  })
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
});