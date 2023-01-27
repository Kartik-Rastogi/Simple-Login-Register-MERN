const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const app = express()
app.use(express.json())
app.use(express.urlencoded({
   extended: true
}))
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/userTemp')
   .then(() => {
      console.log('Database connected');
   })
   .catch((err) => {
      console.log('Unable to connect to db', err.message);
   })

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      max: 40,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      min: 8,
   }
})

const User = new mongoose.model("User", userSchema)

app.post("/login", async (req, res) => {
   const { email, password } = req.body
   try {
      User.findOne({ email: email }, (err, user) => {
         if (user) {
            bcrypt.compare(password, user.password, function (err, response) {
               if (err) {
                  response.status(500).json(err);
               }
               if (response)
                  res.send({ message: "Login Successful", user: user });
               else {
                  res.send({ message: "Password Incorrect!" });
               }
            });
         } else {
            res.send({ message: "User not registered" })
         }
      })
   } catch (err) {
      res.status(500).json(err);
   }
});

app.post("/register", async (req, res) => {
   const { name, email, password } = req.body
   try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create new user
      const newUser = new User({
         name: name,
         email: email,
         password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save(res.send({ message: "Successfully Registered, Please login now." }));
      //res.status(200).json(user);
   } catch (err) {
      res.status(500).json(err);
   }
});

// app.get("/",   (req,res)=>{
//    res.send("Test API")
// })

app.listen(9002, () => {
   console.log("BE started at port 9002")
})