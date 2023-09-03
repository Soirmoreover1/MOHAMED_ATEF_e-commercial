
const jwt = require('jsonwebtoken')
const utli = require('util')
const asyncverify = utli.promisify(jwt.verify)
const customerError = require('../CustomerError')

const authorized = async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, "vvnionv")
    
    if (decoded.id !== req.params.id){ 
        next(customerError({
        message: "Not Authorized",
        statusCode: 401
})) }
    next()
}
const adminauthorized =  async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, "vvnionv")
    console.log(req.params.id)
    if (!decoded.isAdmin) 
        next(customerError({
            message: "Not Authorized",
            statusCode: 401
        }))
    
    next()
}
module.exports = {authorized , adminauthorized}

