// // const Sequelize = require("sequelize");
// // const sequelize = require("../util/database");

// // const User = sequelize.define('user',{
// //  id:{
// //      type:Sequelize.INTEGER,
// //      autoIncrement:true,
// //      allowNull:false,
// //      primaryKey:true
// //  },
// //  name:Sequelize.STRING,
// //  email:Sequelize.STRING
// // })
// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");
// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart; //
//     this._id = id;
//   }
//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }
//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .find({ _id: new mongodb.ObjectId(userId) })
//       .next()
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = { items: updatedCartItems };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }
//   getCart() {
//     const db = getDb();
//     const productID = this.cart.items.map((i) => {
//       return i.productId;
//     });

//     return db
//       .collection("products")
//       .find({ _id: { $in: productID } })
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       });
//   }
//   deleteItemFromCart(productId) {
//     const db = getDb();
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId !== new mongodb.ObjectId(productId);
//     });
//     const items = { items: updatedCartItems };
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: items } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     db.collection("orders")
//       .insertOne(this.cart)
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: [] } }
//           );
//       });
//   }
// }

// module.exports = User;

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { getDb } = require("../util/database");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updateCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = parseInt(this.cart.items[cartProductIndex].quantity) + 1;
    updateCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updateCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updateCart = {
    items: updateCartItems,
  };
  this.cart = updateCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  console.log(productId)
  const updatedCartItems = this.cart.items.filter((item) => {
    return item._id.toString() !== productId.toString();
  });
  console.log(updatedCartItems)
  this.cart.items = updatedCartItems;
  return this.save()
};

userSchema.methods.clearCart = function(){
  this.cart = { items: []};
  return this.save();
}

module.exports = mongoose.model("User", userSchema);
