require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductJSON = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.create(ProductJSON);
    console.log("successful");
  } catch (error) {
    console.error(error);
  }
};

start();
