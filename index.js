const { ethers, utils } = require("ethers");
const erc20Abi = require("./abis/ERC20.json");
const assetAbi = require("./abis/Asset.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://api.avax-test.network/ext/bc/C/rpc"
);
// mainnet rpc: https://api.avax.network/ext/bc/C/rpc

async function showBlockNum() {
  const blockNum = await provider.getBlockNumber();
  console.log(blockNum);
}

// showBlockNum(); // 2582537

const anyETHAddress = "0xfe76dea6a07734532dc91686fb5c3e10f9bda5e3";
const anyETHAssetAddress = "0xBbc2b12BC8f32d81244D86d66E43D4e6a5A3B6b5";

const anyETHContract = new ethers.Contract(anyETHAddress, erc20Abi, provider);
const anyETHAssetContract = new ethers.Contract(
  anyETHAssetAddress,
  assetAbi,
  provider
);

/**
 * check the address's balance of AnyETH token
 * @param {string} address
 */
async function checkAnyEthBalance(address) {
  const balance = await anyETHContract.balanceOf(address);
  const dp = await anyETHContract.decimals();
  return utils.formatUnits(balance, dp);
}

checkAnyEthBalance("0x541c54941bBB237594bbDecE66619952c2EdB228");

/**
 * check the address's balance of AnyETH LP token
 * @param {string} address
 */
async function checkAnyEthLPBalance(address) {
  const balance = await anyETHAssetContract.balanceOf(address);
  const dp = await anyETHContract.decimals();
  return utils.formatUnits(balance, dp);
}

checkAnyEthLPBalance("0x541c54941bBB237594bbDecE66619952c2EdB228");

const participantsAddresses = [
  "0xD4dc7c7AD587E86D7e99649977B51101f85F97BB",
  "0x49e7F98B3468Bbb8Aa2Fe80282cB6aCa3904C84C",
  "0x47cF50b47c956AbF687912B3b377b40d111864f4",
];

// wait for all async function to complete
Promise.all(
  participantsAddresses.map((address) => checkAnyEthBalance(address))
).then((balances) => {
  console.log(balances);
});
