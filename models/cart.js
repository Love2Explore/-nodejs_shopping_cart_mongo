// const fs = require("fs");
// const path = require("path");
// const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static addProducts(id ,productprice) {
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { product: [], totalPrice: 0 };
//       if (err && fileContent === undefined) {
//         cart = { product: [], totalPrice: 0 };
//       }else{
//         cart = JSON.parse(fileContent);
//       }
//       const existingProductIndex = cart.product.findIndex(prod=> prod.id === id );
//       const existingProduct = cart.product[existingProductIndex];
//       let updateProduct;
//       if(existingProduct){
//           updateProduct = {...existingProduct}
//           updateProduct.qty = updateProduct.qty + 1
//           cart.product = [...cart.product];
//           cart.product[existingProductIndex] = updateProduct
//       } else {
//         updateProduct = {id : id , qty :1 };
//         cart.product = [...cart.product , updateProduct]
//       }
//       cart.totalPrice = cart.totalPrice + +productprice ;
//       fs.writeFile(p ,JSON.stringify(cart) , err =>{ console.log(err) })
//     });
//   }

// };

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
// const Cart = sequelize.define("cart", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });
// module.exports = Cart;
