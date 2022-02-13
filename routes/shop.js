const express = require("express");
const router = express.Router();
const shopConroller = require("../controllers/shop");

router.get("/", shopConroller.getProduct);

router.get("/products", shopConroller.getIndex);

router.get("/products/:productid", shopConroller.getProductDetails);

router.get("/cart", shopConroller.getCart);

router.post("/cart", shopConroller.posttotCart);

// router.get("/checkout", shopConroller.getcheckout);

router.get("/orders", shopConroller.getorders);

router.post("/create-orders", shopConroller.postOrder);

router.post("/cart-delete-item", shopConroller.deleteCartItem);

module.exports = router;
