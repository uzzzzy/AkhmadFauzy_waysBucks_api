const express = require('express')

const router = express.Router()

const { auth, authAdmin } = require('../middlewares/auth')

const { login, register } = require('../controllers/auth')
const { getUsers, deleteUser } = require('../controllers/user')

//auth route
router.post('/login', login)
router.post('/register', register)

//users route
router.get('/users', authAdmin, getUsers)
router.delete('/user/:id', authAdmin, deleteUser)

module.exports = router