const jwt = require('jsonwebtoken')
const {User} = require('../models')
const config = require('../../config/config')
const { CustomError } = require('../helpers')

const auth = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        if(!authToken || !authToken.startsWith('Bearer ')){
            throw new CustomError('Unauthorised Error', 401)
        }
        const token = authToken.split(' ')[1]
        const user= jwt.verify(token, config.jwt_secret)
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth