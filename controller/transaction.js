const { makeTransaction, submitTransaction } = require("../bitgo/transaction");
const Transactions = require("../models/transactionModel");
const Transfer = require("../models/transferModel");
const Wallets = require("../models/walletModel");

const initiateTrans = async (req, res, next) => {
  const wallet = await Wallets.findOne({ userName: req.body.userName });

  // initate and sign transaction
  const halfSignTransaction = await makeTransaction(
    req.body.amount,
    req.body.toAddress,
    wallet.walletDetails.walletId,
    wallet.walletDetails.userKeychain.prv
  );

  // save transaction details
  const createdTrans = new Transactions({
    txHash: halfSignTransaction,
    walletId: wallet.walletDetails.walletId,
    userName: req.body.userName,
    submitted: false,
  });
  const savedTransaction = await createdTrans.save();
  res.status(200).json({ status: "success", data: savedTransaction });
};

const submitTrans = async (req, res, next) => {
  const transaction = await Transactions.findOne({
    _id: req.body.transactionId,
  });
  if (transaction.submitted) {
    res
      .status(400)
      .json({ status: "failed", data: "transaction Already submitted" });
  }

  //submit Transaction
  const submittedTransaction = await submitTransaction(
    transaction.txHash,
    transaction.walletId
  );

  //save transfer details
  const createdTransfer = new Transfer({
    transactionId: req.body.transactionId,
    walletId: transaction.walletId,
    transferDetails: submittedTransaction,
  });
  const savedTransfer = await createdTransfer.save();

  //update Transaction
  await Transactions.updateOne(
    { _id: req.body.transactionId },
    {
      $set: {
        submitted: true,
      },
    }
  );
  res.status(201).json({ status: "success", data: savedTransfer });
};

const getTransactions = async (req, res, next) => {
  return next(new AppError("Not Implemented", 400));
};

module.exports = { initiateTrans, submitTrans, getTransactions };
