const Product = require("../models/product");
const Order = require("../models/order");
const Cart = require("../models/cart");

exports.getProduct = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       title: "Shop",
  //       hasProduct: rows.length > 0,
  //       activeShop: true,
  //       productCSS: true,
  //       layout: false,
  //       formCSS: true,
  //       path: "/",
  //       pageTitle: "Product List",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Product.find()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        title: "Shop",
        hasProduct: result.length > 0,
        activeShop: true,
        productCSS: true,
        layout: false,
        formCSS: true,
        path: "/",
        pageTitle: "Product List",
        // sAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       path: "/index",
  //       pageTitle: "Shop",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Product.find()
    .then((result) => {
      res.render("shop/index", {
        prods: result,
        path: "/index",
        pageTitle: "Shop",
        // sAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((result) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: result.cart.items,
      });
    })
    .catch((err) => {});
};

exports.posttotCart = (req, res, next) => {
  const prodid = req.body.productid;
  // Product.findById(prodid)
  //   .then(([row]) => {
  //     Cart.addProducts(row, row.price);
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Product.findById(prodid).then((product) => {
    return req.user.addToCart(product).then((result) => {
      res.redirect("/cart");
    });
  });
};

exports.getcheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    sAuthenticated: req.isLoggedIn,
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getorders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
  .then((orders) => {
    console.log(orders)
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Orders",
      orders: orders,
    });
  })
  .catch(()=>{
    console.log(err)
  })
};

exports.getProductDetails = (req, res, next) => {
  const productid = req.params.productid;
  // Product.findById(productid)
  //   .then((result) => {
  //     res.render("shop/product-details", {
  //       path: "shop/product-details",
  //       pageTitle: "Product Details",
  //       product: result[0][0],
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Product.findById(productid)
    .then((products) => {
      res.render("shop/product-details", {
        path: "shop/product-details",
        pageTitle: "Product Details",
        product: products,
        // sAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {});
};

exports.deleteCartItem = (req, res, next) => {
  const prodid = req.body.productId;
  req.user
    .removeFromCart(prodid)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
