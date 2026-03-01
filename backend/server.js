require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

app.use(express.json());



// Replace your old cors line with this one:
//const cors = require('cors');

// Replace your existing app.use(cors()) with this:
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Test route
app.get("/test", (req, res) => {
  res.send("Test route working");
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});