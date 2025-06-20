const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const app = express();
require("dotenv").config();

const MONGODB_CLOUD_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Movie Schema
const movieSchema = new mongoose.Schema({
  id: String,
  movie_name: String,
  movie_pic: String,
  year: Number,
  language: String,
  zoner: String,
  rating: Number,
  director: String,
  video: String,
  seats_booked: [String],
});

const Movie = mongoose.model("Movie", movieSchema, "Movies"); // collection: Movies

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_CLOUD_URL)
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Server is working fine 🎉");
});

// ✅ Get all movies
app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send(allMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// ✅ Get a specific movie by ID
app.get("/movies/:id", async (req, res) => {
  const movieId = Number(req.params.id);  // 👈 important
  try {
    const movie = await Movie.findOne({ id: movieId });
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


// ✅ Update seats_booked for a movie
app.patch("/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  const updatedSeats = req.body.seats_booked;

  try {
    const movie = await Movie.findByIdAndUpdate(
      movieId,
      { $set: { seats_booked: updatedSeats } },
      { new: true }
    );

    if (movie) {
      res.send({ message: "Seats updated successfully", movie });
    } else {
      res.status(404).send({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// ✅ User Auth
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Users = mongoose.model("User", userSchema, "users");

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new Users({ username, password });

  try {
    const result = await newUser.save();
    res.send({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).send({ message: "Signup failed", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: "user not found" });
    }
    if (password !== user.password) {
      return res.status(401).send({ message: "password is not correct" });
    }

    res.send({ message: "login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
});

// ✅ Razorpay
const razorpay = new Razorpay({
  key_id: 'rzp_test_ltmkskOb29dwDe',
  key_secret: 'pqfth2mcL3A4l0fJPOcJDEcO'
});

app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  });
  res.json(order);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log("Express server running on port " + PORT);
});














// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const Razorpay = require('razorpay');
// // const movies = require("./movies.json");
// const app = express();
// require("dotenv").config();

// const MONGODB_CLOUD_URL=process.env.MONGODB_URI;


// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is working fine 🎉");
// });


// // app.get("/movies", (req, res) => {
// //   res.json(movies);
// // });

// app.get("/movies", async (req, res) => {
//   try {
//     const allMovies = await Movie.find();
//     res.json({ movies: allMovies });
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     res.status(500).json({ message: "Failed to fetch movies" });
//   }
// });


// app.get("/movies/:id", (req, res) => {
//   const movieId = req.params.id;
//   const movie = movies.movies.find(m => m.id === movieId);
  
//   if (movie) {
//     res.send(movie);
//   } else {
//     res.status(404).send({ message: "Movie not found" });
//   }
// });


// app.patch("/movies/:id", (req, res) => {
//   const movieId = req.params.id;
//   const updatedSeats = req.body.seats_booked;

//   const movie = movies.movies.find((m) => m.id === movieId);

//   if (movie) {
//     movie.seats_booked = updatedSeats;
//     res.send({ message: "Seats updated successfully", movie });
//   } else {
//     res.status(404).send({ message: "Movie not found" });
//   }
// });


// mongoose.connect(`${MONGODB_CLOUD_URL}HomeTheatre`)
// .then(() => console.log("✅ MongoDB Connected to Atlas"))
// .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });

// const Users = mongoose.model("User", userSchema,"users");  

// app.post("/signup", async (req, res) => {
//    var  {username, password} = req.body;
//   const newUser = new Users({ username ,password });

//   try {
//   const result = await newUser.save();
//   res.send({ message: "Account created successfully" });
//     } catch (err) {
//   res.status(500).send({ message: "Signup failed", error: err.message });
//    }
//    //data is save in User collection
// });

// app.post("/login", async (req, res) => {
//    var  {username, password} = req.body;
//    try 
//    {
//     const user = await Users.findOne({username});
    
//     if(!user)
//     {
//       return res.status(401).send({message:"user not found"})
//     }
//     if (password !== user.password) 
//     {
//       return res.status(401).send({message:"password is not correct"})
//     }
//     res.send({message:"login successful"})

//    }catch(error)
//    {
//     console.log(error)
//     res.status(500).send({message:"internal server error"})
//    }

// });

//   const razorpay = new Razorpay({
//   key_id: 'rzp_test_ltmkskOb29dwDe',         
//   key_secret: 'pqfth2mcL3A4l0fJPOcJDEcO'        
// });

// app.post("/api/create-order", async (req, res) => {
//      const { amount } = req.body;
//     const order = await razorpay.orders.create({    //create a order 
//       amount: amount * 100,  //convert amount into paise (1rs == 100paise)
//       currency: "INR",    // tell which type of money to transform 
//       receipt: "receipt_order_" + Date.now(),  //for security and backup purpose
//     });
//   res.json(order);  // send order to frontend
// });




// app.listen(PORT, () => {
//   console.log("Express server running on port 5000");
// });
