const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const walletRouter = require("./routes/walletRouter");
const transactionRouter = require("./routes/transactionRouter");
const {
  createWallet,
  getWallet,
  walletBalance,
} = require("./controller/wallet");
const { initiateTransaction, submitTransaction, getTransactions } = require("./controller/transaction");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/virtualWallet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(bodyParser.json());

// Define a health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is healthy" });
});

app.use("/api/v1/wallet",walletRouter);
app.use("/api/v1/transaction", transactionRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
