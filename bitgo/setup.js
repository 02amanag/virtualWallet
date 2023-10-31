const { BitGo } = require("bitgo");

const Bitgo = () => {
  // Fill in with actual access token
  const accessToken =
    "v2x06a6ca014fbf82da3725c3457e0a17060eed2ea7c10165dbf5ab2c3abd9a84e7";

  // Initialize the SDK
  const bitgoObj = new BitGo({
    accessToken: accessToken,
    env: "test",
  });

  return bitgoObj;
};

const Wallet = async (walletId) => {
  const coin = "tbtc";
  const bitgo = Bitgo();
  const walletObj = await bitgo.coin(coin).wallets().get({ id: walletId });
  return walletObj
};

module.exports = { Bitgo, Wallet };
