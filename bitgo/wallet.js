const { Wallet, Bitgo } = require("./setup");

const createWallet = async (label, passphrase) => {
  const bitgo = Bitgo()
  const newWallet = await bitgo.coin("tbtc").wallets().generateWallet({
    label: label,
    passphrase: passphrase,
    enterprise: "6522803c6329b8000709fa4c21072371",
  });
  return newWallet;
};

const getWallet = async (walletId) => {
  const walletObj = await Wallet(walletId);
  return walletObj._wallet;
};

const getWalletBalance = async (walletId) => {
  const wallet = await Wallet(walletId);
  return await wallet.balanceString();
};

module.exports = { createWallet, getWallet, getWalletBalance };
