const Product = require("../models/product");
const mongodb = require("mongodb");

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  //   .then((result) => {
  //     res.render("admin/edit-products", {
  //       title: "Add Product",
  //       path: "/admin/add-product",
  //       formCSS: true,
  //       pageTitle: "Product List",
  //       editing: false,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  res.render("admin/edit-products", {
    title: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    pageTitle: "Product List",
    editing: false,
    //isAuthenticated: true //req.isLoggedIn
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodid = req.params.productId;

  Product.findById(prodid)
    //Product.findByPk(prodid)
    .then((product) => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-products", {
        title: "Edit Product",
        path: "/admin/edit-product",
        formCSS: true,
        product: product,
        pageTitle: "Product List",
        editing: editMode,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const productid = req.body.productid;
  const title = req.body.title;
  const imageurl = req.body.imageurl;
  const description = req.body.description;
  const price = req.body.price;
  Product.findById(productid)
  .then((result) => {
    result.title = title;
    result.imageurl = imageurl;
    result.description = description;
    result.price = price;
    return result.save()
  })
  .then(()=>{
    console.log("Updated successfuly");
    res.redirect("/admin/products");
  })
  .catch((err) => {
    console.log(err);
  })

 
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageurl = req.body.image;
  const description = req.body.description;
  const price = req.body.price;
  // req.user
  //   .createProduct({
  //     title: title,
  //     price: price,
  //     imageUrl: imageurl,
  //     description: description,
  //   })
  const product = new Product({
    title:title,
    price:price,
    description:description,
    imageurl:imageurl,
    userId: req.user
  });
  product.save()
  .then((result) => {
    console.log("Product Created");
    res.redirect("/admin/products");
  })
  .catch((err) => {
    console.log(err);
  });
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageurl,
  //   description: description,
  //   userId:req.user.id
  // })
  // .then((result) => {
  //   console.log("Product Created");
  //   res.redirect("/admin/products");
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  // const product = new Product(null,title,imageurl,description,price )
  // product.save()
  res.redirect("/");
};

exports.getAllProducts = (req, res, next) => {
  // Product.findAll()
  Product.find()
  // .select('title price -_id')
  // .populate('userId', 'name')
    .then((result) => {
      res.render("admin/product", {
        prods: result,
        path: "/admin/products",
        pageTitle: "Admin Product",
        sAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //   Product.fetchAll()
  //     .then(([rows, fieldData]) => {
  //       res.render("admin/product", {
  //         prods: rows,
  //         path: "/admin/products",
  //         pageTitle: "Admin Product",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodid = req.body.productid;
  // Product.destroy({ where: { id: prodid } });
  Product.findByIdAndRemove(prodid)
    .then((result) => {
      console.log("Product Deletet");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
