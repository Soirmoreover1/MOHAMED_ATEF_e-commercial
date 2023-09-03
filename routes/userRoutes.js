const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const customerError = require("../CustomerError");

const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
const {authorized , adminauthorized} = require('../middlewares/authenticate');





// User registration
router.post('/register', async (req, res) => {
    try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const user=new User(req.body)
    const token = await user.generateAuthToken()

    await user.save();
    res.status(201).send({user,token}).json(token);
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
});




router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const finduser = await User.findOne({ email });

  if (!finduser) {
    next(
      customerError({
        statusCode: 401,
        message: "password or email is not correct",
      })
    );
  }
  const copmarpass = await bcrypt.compare(password, finduser.password);
  if (!copmarpass) {
  next(
    customerError({
      statusCode: 401,
      message: "password or email is not correct",
    })
  );
}
const token = await finduser.generateAuthToken();
    res.status(200).send(token);
});


module.exports = router;