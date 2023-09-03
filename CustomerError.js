module.exports = ({statusCode , message})=>{
    const customerError = new Error(message)
    customerError.status = statusCode
    customerError.message = message
    return customerError
}