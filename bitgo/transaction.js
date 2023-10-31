const { Wallet } = require("./setup");

const makeTransaction = async (amount, toAddress, walletId, userPvtKey) => {
  const preBuildTrans = await initiateTransaction(amount, toAddress, walletId);
  const halfSignTrans = await signTransaction(
    walletId,
    userPvtKey,
    preBuildTrans
  );
  return halfSignTrans;
};

const initiateTransaction = async (amount, toAddress, walletId) => {
  const wallet = await Wallet(walletId);
  let params = {
    recipients: [
      {
        amount: amount,
        address: toAddress, //to toAddress
      },
    ],
  };
  const preBuild = await wallet.prebuildTransaction(params);
  return preBuild;
};

const signTransaction = async (walletId, userPvtKey, preBuild) => {
  const wallet = await Wallet(walletId);

  const halfSignTransaction = await wallet.signTransaction({
    txPrebuild: preBuild,
    prv: userPvtKey,
  });

  return halfSignTransaction;
};

const submitTransaction = async (halfSignTransaction, walletId) => {
  const wallet = await Wallet(walletId);
  const transferReceipt = await wallet.submitTransaction(halfSignTransaction);
  return transferReceipt;
};

module.exports = {
  submitTransaction,
  signTransaction,
  initiateTransaction,
  makeTransaction,
};
