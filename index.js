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
async function checkAnyEthBalance(address) {
  const balance = await anyETHContract.balanceOf(address);
  const dp = await anyETHContract.decimals();
  console.log(utils.formatUnits(balance, dp));
}

checkAnyEthBalance("0x541c54941bBB237594bbDecE66619952c2EdB228");

const anyETHAssetContract = new ethers.Contract(
  anyETHAssetAddress,
  assetAbi,
  provider
);
async function checkAnyEthLPBalance(address) {
  const balance = await anyETHAssetContract.balanceOf(address);
  const dp = await anyETHContract.decimals();
  console.log(utils.formatUnits(balance, dp));
}

checkAnyEthLPBalance("0x541c54941bBB237594bbDecE66619952c2EdB228");
