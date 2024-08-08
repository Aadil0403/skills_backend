const express = require('express')
const {userController} = require('../controllers')
const {auth} = require('../middlewares')

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/dashboard',auth, userController.getUser)
router.delete('/self', auth, userController.getUserEmail)
router.delete('/domain', auth, userController.updateUserDomain)

module.exports = router