const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  transferDetails: Object,
  walletId: String,
  transactionId: {
    type: mongoose.Schema.ObjectId,
    ref: "transactions",
  },
});

const Transfers = mongoose.model("transfers", transferSchema);

module.exports = Transfers;
