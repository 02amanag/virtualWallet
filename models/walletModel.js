const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  walletDetails: {
    walletId: String,
    label: String,
    enterprise: String,
    coin: String,
    receiveAddress: {
      id: String,
      address: String,
      chain: Number,
      index: Number,
      coin: String,
      wallet: String,
      coinSpecific: {
        redeemScript: String,
        witnessScript: String,
      },
    },
    userKeychain: Object,
    backupKeychain: Object,
    bitgoKeychain: Object,
  },

  userName: {
    type: String,
    unique: true,
  },
});

const Wallets = mongoose.model("wallets", walletSchema);

module.exports = Wallets;
