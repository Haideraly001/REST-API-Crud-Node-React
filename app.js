require("dotenv").config();

const express = require('express');
const app = express();
const connectDB = require("./db/connect");
const products_routes = require("./routes/products");

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// Middleware to set router
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} yes I am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
