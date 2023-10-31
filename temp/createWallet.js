const { BitGo } = require("bitgo");

// Fill in with actual access token
const accessToken =
  "v2x06a6ca014fbf82da3725c3457e0a17060eed2ea7c10165dbf5ab2c3abd9a84e7";

// Initialize the SDK
const bitgo = new BitGo({
  accessToken: accessToken,
  env: "test",
});

async function createHotWalletSimple() {
  const newWallet = await bitgo.coin("tbtc").wallets().generateWallet({
    label: "testWallet",
    passphrase: "VerySecurePassword1234567",
    enterprise: "6522803c6329b8000709fa4c21072371",
  });

  console.log(JSON.stringify(newWallet, undefined, 2));
}

async function getWallet() {
  let walletId = "653aa4653aa40b00075ca1cbe3e666bd";
  bitgo
    .coin("tbtc")
    .wallets()
    .get({ id: walletId })
    .then(function (wallet) {
      // print the wallet
      console.dir(wallet._wallet);
    });
}

async function initiateTrans() {
  let walletId = "653aa4653aa40b00075ca1cbe3e666bd";
  let wallet = await bitgo.coin("tbtc").wallets().get({ id: walletId });

  let params = {
    recipients: [
      {
        amount: "5000",
        address: "2NBjUtGjamJFFwP3YCB9NR8fJonLrXWKZsQ", //to address
      },
    ],
  };
  const preBuild = await wallet.prebuildTransaction(params);
  // console.log("preBuild :", JSON.stringify(preBuild));

  return preBuild;
}

async function signTrans() {
  const preBuild = await initiateTrans();
  let walletId = "653aa4653aa40b00075ca1cbe3e666bd";
  let wallet = await bitgo.coin("tbtc").wallets().get({ id: walletId });

  // from wallet details userKeychain.pvtKey
  let PvtKey =
    "xprv9s21ZrQH143K2X5Kd6pn66ra41xLsnyhQSXdz8w4kXxRxET6mVK3e5vF3ba92JUAXYKxckuX4C2PV46jr2jXgbXLH3EA9o14S2U1tFjnND6";
  wallet
    .signTransaction({ txPrebuild: preBuild, prv: PvtKey })
    .then(function (transaction) {
      // print half-signed transaction hex
      console.dir(transaction);
    });

  // output
  // {
  //   txHex: '01000000000101c1966a940b118193dda7e4999d248bf905f7a63099e5dc122b3fcb89d7034da10000000023220020b8de747835057f41a73589b5310fd0135a54633c658cbe9033d9c47fe8470326ffffffff01881300000000000017a914caca588bc330be3178445ec16fe5c6758c4b3d7c8705004730440220409f6b747d444cf44383686fbf103c667323239b72ef1c85b2ea90f1e65e6c7002203df27e54f02dc71dd1ccd223512d558de4bc7481624f899e1352cfe88fdd42d301000069522102a32a1a69c6105272b8004f8b64b47b6330b975f3e823a05e33aab11e92029418210239a922643867f2208c26dc1eb19d577e205a5dc16997a11270eb2bcd4c27c90a210212a76a307b14488191664a0407b6a1d3fd1d974279e5888a06dfd39485240ffa53ae00000000'
  // }
}

async function submitTransaction() {
  let walletId = "653aa4653aa40b00075ca1cbe3e666bd";
  let wallet = await bitgo.coin("tbtc").wallets().get({ id: walletId });
  let params = {
    txHex:
      "01000000000101c1966a940b118193dda7e4999d248bf905f7a63099e5dc122b3fcb89d7034da10000000023220020b8de747835057f41a73589b5310fd0135a54633c658cbe9033d9c47fe8470326ffffffff01881300000000000017a914caca588bc330be3178445ec16fe5c6758c4b3d7c8705004730440220409f6b747d444cf44383686fbf103c667323239b72ef1c85b2ea90f1e65e6c7002203df27e54f02dc71dd1ccd223512d558de4bc7481624f899e1352cfe88fdd42d301000069522102a32a1a69c6105272b8004f8b64b47b6330b975f3e823a05e33aab11e92029418210239a922643867f2208c26dc1eb19d577e205a5dc16997a11270eb2bcd4c27c90a210212a76a307b14488191664a0407b6a1d3fd1d974279e5888a06dfd39485240ffa53ae00000000",
    //  otp: '0000000',
  };
  wallet.submitTransaction(params).then(function (transaction) {
    // print transaction status
    console.dir(transaction);
  });

  // {
  //   transfer: {
  //     entries: [ [Object], [Object] ],
  //     id: '653d0ec858dd8800070cf1124c4b8e6a',
  //     coin: 'tbtc',
  //     wallet: '653aa4653aa40b00075ca1cbe3e666bd',
  //     walletType: 'hot',
  //     enterprise: '6522803c6329b8000709fa4c21072371',
  //     txid: '50fd098098771c272d6d2f6c5cfa6c66262026a8a4c26ab998e5fd99b1e959c6',
  //     txidType: 'transactionHash',
  //     height: 999999999,
  //     heightId: '999999999-653d0ec858dd8800070cf1124c4b8e6a',
  //     date: '2023-10-28T13:38:16.934Z',
  //     type: 'send',
  //     value: -10945,
  //     valueString: '-10945',
  //     intendedValueString: '-10945',
  //     baseValue: -5000,
  //     baseValueString: '-5000',
  //     baseValueWithoutFees: -5000,
  //     baseValueWithoutFeesString: '-5000',
  //     feeString: '5945',
  //     payGoFee: 0,
  //     payGoFeeString: '0',
  //     usd: -3.729029359,
  //     usdRate: 34070.62,
  //     state: 'signed',
  //     instant: false,
  //     isReward: false,
  //     isFee: false,
  //     tags: [
  //       '653aa4653aa40b00075ca1cbe3e666bd',
  //       '6522803c6329b8000709fa4c21072371'
  //     ],
  //     history: [ [Object], [Object] ],
  //     signedDate: '2023-10-28T13:38:16.933Z',
  //     vSize: 182,
  //     metadata: [],
  //     signedTime: '2023-10-28T13:38:16.933Z',
  //     createdTime: '2023-10-28T13:38:16.287Z'
  //   },
  //   txid: '50fd098098771c272d6d2f6c5cfa6c66262026a8a4c26ab998e5fd99b1e959c6',
  //   tx: '01000000000101c1966a940b118193dda7e4999d248bf905f7a63099e5dc122b3fcb89d7034da10000000023220020b8de747835057f41a73589b5310fd0135a54633c658cbe9033d9c47fe8470326ffffffff01881300000000000017a914caca588bc330be3178445ec16fe5c6758c4b3d7c8704004730440220409f6b747d444cf44383686fbf103c667323239b72ef1c85b2ea90f1e65e6c7002203df27e54f02dc71dd1ccd223512d558de4bc7481624f899e1352cfe88fdd42d301473044022014e5df73a54a6a07747ba62d846cfcb2a80868778917be74c16731eae2f83c30022032d6bd73c7e03fcfd159d7427a94bd768a07d0ede6b7622e34f26c795c909f3a0169522102a32a1a69c6105272b8004f8b64b47b6330b975f3e823a05e33aab11e92029418210239a922643867f2208c26dc1eb19d577e205a5dc16997a11270eb2bcd4c27c90a210212a76a307b14488191664a0407b6a1d3fd1d974279e5888a06dfd39485240ffa53ae00000000',
  //   status: 'signed'
  // }
}

getWallet();
