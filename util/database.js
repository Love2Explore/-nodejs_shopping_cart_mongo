// const mysql = require('mysql2')
// const pool = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     database:"node-sqldb",
//     password:"Hello@123"
// })

// module.exports = pool.promise()
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-sqldb", "root", "Hello@123", {
//   dialect: "mysql",
//   host: "localhost",
// });
// module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db ;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://rewati123:Hello%40123@cluster0.x2sw8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("Mongo DB Connected");
      _db = result.db()
      callback(result);
    })
    .catch((err) => {
      console.log(err);
      throw err
    });
};

const getDb = () =>{
  if(_db){
    return _db
  }
  throw 'No Database Found!!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;