const { ethers, utils } = require("ethers");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const erc20Abi = require("./abis/ERC20.json");
const participants = require("./participants.json");
const tokens = require("./tokens.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://api.avax-test.network/ext/bc/C/rpc"
);
// mainnet rpc: https://api.avax.network/ext/bc/C/rpc

/**
 * check the address's balance of token or LP token
 * @param {Object} token obj with symbol and address
 * @param {string} address
 */
async function getTokenBalance(token, address) {
  const tokenContract = new ethers.Contract(token.address, erc20Abi, provider);
  const balance = await tokenContract.balanceOf(address);
  const dp = await tokenContract.decimals();
  return utils.formatUnits(balance, dp);
}

async function main() {
  const csvWriter = createCsvWriter({
    path: "data/result.csv",
    header: [
      { id: "address", title: "address" },
      ...tokens.map((token) => ({ id: token.symbol, title: token.symbol })),
    ],
  });

  const records = [];

  for (const address of participants) {
    await Promise.all(
      tokens.map(async (token) => {
        const balance = await getTokenBalance(token, address);
        return { symbol: token.symbol, balance };
      })
    ).then((tokenBalances) => {
      const balanceObj = tokenBalances.reduce((obj, item) => {
        obj[item.symbol] = item.balance;
        return obj;
      }, {});
      records.push({
        address,
        ...balanceObj,
      });
    });
  }
  csvWriter.writeRecords(records);
}

main();
