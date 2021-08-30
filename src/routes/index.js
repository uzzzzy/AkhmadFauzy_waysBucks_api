const express = require('express')

const router = express.Router()

const { auth, authAdmin } = require('../middlewares/auth')
const { uploadFile, updateImage } = require('../middlewares/uploadFile')

const { login, register } = require('../controllers/auth')
const { getUsers, deleteUser } = require('../controllers/user')
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getToppings, addTopping, getTopping, updateTopping } = require('../controllers/topping')

//auth route
router.post('/login', login)
router.post('/register', register)

//users route
router.get('/users', authAdmin, getUsers)
router.delete('/user/:id', authAdmin, deleteUser)

//product route
router.get('/products', getProducts)
router.get('/product/:id', auth, getProduct)
router.post('/product', authAdmin, uploadFile("image"), addProduct)
router.put('/product/:id', authAdmin, updateImage("image"), updateProduct)
router.delete('/product/:id', authAdmin, deleteProduct)

//topping route
router.get('/toppings', getToppings)
router.get('/topping/:id', getTopping)
router.post('/topping', authAdmin, uploadFile("image"), addTopping)
router.put('/topping/:id', authAdmin, updateImage("image"), updateTopping)

module.exports = router