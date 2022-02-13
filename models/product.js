// // //database
// // const sqldb = require("../util/database");
// // const fs = require("fs");
// // const path = require("path");
// // const { mainModule } = require("process");
// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   "data",
// //   "products.json"
// // );

// // const getProductFromFile = (cb) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       return cb([]);
// //     }
// //     if (
// //       fileContent !== null ||
// //       fileContent !== undefined ||
// //       fileContent.length !== 0
// //     ) {
// //       cb(JSON.parse(fileContent));
// //     } else {
// //       return cb([]);
// //     }
// //   });
// // };

// // module.exports = class Product {
// //   constructor(id, title, imageurl, description, price) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageurl = imageurl;
// //     this.description = description;
// //     this.price = price;
// //   }
// //   save() {
// //     getProductFromFile((products) => {
// //       if (this.id) {
// //         const existingProductIndex = products.findIndex(
// //           (prod) => prod.id === this.id
// //         );
// //         const updateProducts = [...products];
// //         updateProducts[existingProductIndex] = this;
// //         fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
// //           console.log(err);
// //         });
// //       } else {
// //         this.id = (Math.random() *10 ).toString() ;
// //         return sqldb.execute("INSERT INTO products (id ,  title, price, description, imageUrl) VALUES (? ,? , ? , ? , ?)", [ this.id, this.title , this.price , this.description ,   this.imageurl ])
// //       }
// //     });
// //   }

// //   static deleteById(id) {}

// //   static fetchAll() {
// //     return sqldb.execute("SELECT * FROM products");
// //   }

// //   static findById(id) {
// //     return sqldb.execute("SELECT * FROM products WHERE ID = " + id );
// //   }
// // };

// // const Sequelize = require("sequelize");
// // const sequelize = require("../util/database");
// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id,userid) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//     this.userid = userid
//   }
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((result) => {
//         console.log(result);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static delete(id) {
//     const db = getDb();
//     db.collection("products")
//       .deleteOne({ _id: mongodb.ObjectId(id) })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
// // const Product = sequelize.define("product", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false,
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// // });

// module.exports = Product;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: { 
    type:String ,
    required: true
  },
  price:{
    type:String ,
    required: true
  },
  description:{
    type:String ,
    required:true
  },
  imageUrl:{
    type:String,
    reuired:true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }
});

module.exports = mongoose.model('Product', productSchema);