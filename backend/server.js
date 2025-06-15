const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const movies = require("./movies.json");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/movies", (req, res) => {
  res.json(movies);
});

mongoose.connect('mongodb://localhost:27017/HomeTheatre')
.then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.error("❌ MongoDB Connection Failed", err);
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Users = mongoose.model("User", userSchema,"users");  

app.post("/signup", async (req, res) => {
   var  {username, password} = req.body;
  const newUser = new Users({ username ,password });

  try {
  const result = await newUser.save();
  res.send({ message: "Account created successfully" });
    } catch (err) {
  res.status(500).send({ message: "Signup failed", error: err.message });
   }
   //data is save in User collection
});

app.post("/login", async (req, res) => {
   var  {username, password} = req.body;
   try 
   {
    const user = await Users.findOne({username});
    
    if(!user)
    {
      return res.status(401).send({message:"user not found"})
    }
    if (password !== user.password) 
    {
      return res.status(401).send({message:"password is not correct"})
    }
    res.send({message:"login successful"})

   }catch(error)
   {
    console.log(error)
    res.status(500).send({message:"internal server error"})
   }

});

  const razorpay = new Razorpay({
  key_id: 'rzp_test_ltmkskOb29dwDe',         
  key_secret: 'pqfth2mcL3A4l0fJPOcJDEcO'        
});

app.post("/api/create-order", async (req, res) => {
     const { amount } = req.body;
    const order = await razorpay.orders.create({    //create a order 
      amount: amount * 100,  //convert amount into paise (1rs == 100paise)
      currency: "INR",    // tell which type of money to transform 
      receipt: "receipt_order_" + Date.now(),  //for security and backup purpose
    });
  res.json(order);  // send order to frontend
});




app.listen(PORT, () => {
  console.log("Express server running on port 3003");
});
