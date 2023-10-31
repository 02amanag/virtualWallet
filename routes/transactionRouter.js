const express = require("express");
const {
  initiateTrans,
  submitTrans,
  getTransactions,
} = require("../controller/transaction");

const transactionRouter = express.Router();

transactionRouter.post("/initate", initiateTrans);
transactionRouter.post("/submit", submitTrans);
transactionRouter.get("/details", getTransactions);

module.exports = transactionRouter;
