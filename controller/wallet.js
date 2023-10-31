const Wallets = require("../models/walletModel");
const BitGoWallet = require("../bitgo/wallet");

const getWallet = async (req, res, next) => {
  const wallet = await Wallets.findOne({ userName: req.body.userName });
  res.status(200).json({ status: "success", data: wallet });
};

const createWallet = async (req, res, next) => {
  console.log("here ");
  const createWallet = await BitGoWallet.createWallet(
    req.body.label,
    req.body.passphrase
  );

  const createdWallet = new Wallets({
    userName: req.body.userName,
    walletDetails: {
      walletId: createWallet.wallet._wallet.id,
      label: createWallet.wallet._wallet.label,
      enterprise: createWallet.wallet._wallet.enterprise,
      coin: createWallet.wallet._wallet.coin,
      receiveAddress: createWallet.wallet._wallet.receiveAddress,
      userKeychain: {
        id: createWallet.userKeychain.id,
        pub: createWallet.userKeychain.pub,
        ethAddress: createWallet.userKeychain.ethAddress,
        source: createWallet.userKeychain.source,
        type: createWallet.userKeychain.type,
        encryptedPrv: createWallet.userKeychain.encryptedPrv,
        prv: createWallet.userKeychain.prv,
      },
      backupKeychain: {
        id: createWallet.backupKeychain.id,
        pub: createWallet.backupKeychain.pub,
        ethAddress: createWallet.backupKeychain.ethAddress,
        source: createWallet.backupKeychain.source,
        type: createWallet.backupKeychain.type,
        prv: createWallet.backupKeychain.prv,
      },
      bitgoKeychain: {
        id: createWallet.bitgoKeychain.id,
        pub: createWallet.bitgoKeychain.pub,
        ethAddress: createWallet.bitgoKeychain.ethAddress,
        source: createWallet.bitgoKeychain.source,
        type: createWallet.bitgoKeychain.type,
        isBitGo: createWallet.bitgoKeychain.isBitGo,
      },
    },
  });

  const savedWallet = await createdWallet.save();
  // res.send("this is expample")
  res.status(201).json({ status: "success", data: savedWallet });
};

const walletBalance = async (req, res, next) => {
  const wallet = await Wallets.findOne({ userName: req.body.userName });
  const balance = await BitGoWallet.getWalletBalance(
    wallet.walletDetails.walletId
  );
  res.status(201).json({ status: "success", data: balance });

  // return next(new AppError("Not Implemented", 400));
};

module.exports = { getWallet, createWallet, walletBalance };
