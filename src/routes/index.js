const express = require('express')

const router = express.Router()

const { auth, authAdmin } = require('../middlewares/auth')
const { uploadFile, updateImage } = require('../middlewares/uploadFile')

const { login, register } = require('../controllers/auth')
const { getUsers, deleteUser } = require('../controllers/user')
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getToppings, addTopping, getTopping, updateTopping, deleteTopping } = require('../controllers/topping')
const { getTransaction, addTransaction, deleteTransaction, updateTransaction, getTransactions, getTransactionByUser } = require('../controllers/transaction')

//auth route
router.post('/login', login)
router.post('/register', register)

//users route
router.get('/users', authAdmin, getUsers)
//update user
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
router.delete('/topping/:id', authAdmin, deleteTopping)

//router transaction
router.get('/transactions', auth, getTransactions)
router.get('/transaction/:id', auth, getTransaction)
router.get('/my-transactions', auth, getTransactionByUser)
router.post('/transaction', auth, addTransaction)
router.put('/transaction/:id', auth, updateTransaction)
router.delete('/transaction/:id', authAdmin, deleteTransaction)

module.exports = router