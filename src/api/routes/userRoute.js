const express = require('express')
const {userController} = require('../controllers')
const {auth} = require('../middlewares')

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/dashboard',auth, userController.getUser)
router.get('/self', auth, userController.getUserEmail)
router.get('/alluser', userController.getUserName)
router.delete('/domain', auth, userController.updateUserDomain)

module.exports = router