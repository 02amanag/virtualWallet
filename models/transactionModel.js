const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  txHash: Object,
  walletId: String,
  userName: {
    type: String,
    ref: "wallets",
  },
  submitted: Boolean,
});

const Transactions = mongoose.model("transactions", transactionSchema);

module.exports = Transactions;
