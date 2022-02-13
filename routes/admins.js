const express = require('express')
const router = express.Router();
const adminController  = require('../controllers/admin')

router.get('/add-product',adminController.getProducts)

router.post('/add-product',adminController.postAddProducts)

router.get('/edit-product/:productId',adminController.getEditProduct)

router.post('/edit-product', adminController.updateProduct)

router.get('/products',adminController.getAllProducts)

router.post('/delete-product',adminController.postDeleteProduct)



module.exports = router