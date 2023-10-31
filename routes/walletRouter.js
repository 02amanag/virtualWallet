const express = require("express");
const {
  getWallet,
  createWallet,
  walletBalance,
} = require("../controller/wallet");

const walletRouter = express.Router();

walletRouter.post("/create", createWallet);
walletRouter.post("/details", getWallet);
walletRouter.post("/balance", walletBalance);

module.exports = walletRouter;
