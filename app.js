const express = require("express");
const bodyparser = require("body-parser");
const admin_route = require("./routes/admins");
const shop_route = require("./routes/shop");
const auth_route = require("./routes/auth");
const path = require("path");
const getErrorController = require("./controllers/error");
const mongoose = require("mongoose");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
const session = require("express-session");
const  expressSession = require("express-session");
const MongoDBtore = require("connect-mongodb-session")(session);

// const sequelize = require("./util/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");

//express
const app = express();
const store = new MongoDBtore({
  uri: "mongodb+srv://rewati123:Hello%40123@cluster0.x2sw8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  collection: "session",
});

//global configuration
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));
//routes
app.use((req, res, next) => {
  User.findById("6208a6d30aa839852cd784f4")
    .then((user) => {
      req.user =user
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    name: "SESS_NAME",
    secret: "SESS_SECRET",
    store: store,
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //   sameSite: false,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 1000,
    //   httpOnly: true,
    // },
  })
);

app.use("/admin", admin_route);
app.use(shop_route);
app.use(auth_route);

app.use(getErrorController.getError);

mongoose.connect("mongodb+srv://rewati123:Hello%40123@cluster0.x2sw8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name:"rewati",
        email:"rewati@gmail.com",
        cart:{
          items:[]
        }
      })
      user.save()
    }
  })

  app.listen(3000, () => {
    console.log("Server started at 3000 Port");
  })
})
.catch(err=>{
  console.log(err)
})




// Product.belongsTo(User, { contraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasMany(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem})
// Product.belongsToMany(Cart,{through:CartItem})

// sequelize
//    //.sync({force:true})
//    .sync()
//   .then((result) => {
//     User.findByPk(1)
//       .then((user) => {
//         if (!user) {
//           return User.create({
//             name: "Rewati Raman",
//             email: "rewati.raman@gmail.com",
//           });
//         }
//         return user;
//       })
//       .then((user) => {
//         return user.createCart()
//         // console.log(user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     //console.log(result)
//     app.listen(3000, () => {
//       console.log("Server started at 3000 Port");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
