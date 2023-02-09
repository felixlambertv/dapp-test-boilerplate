require("dotenv").config();

const NETWORK_NAME = process.env.NETWORK_NAME;
const RPC_URL = process.env.RPC_URL;
const CHAIN_ID = process.env.CHAIN_ID;
const SYMBOL = process.env.SYMBOL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const URL = process.env.URL;

module.exports = {
    NETWORK_NAME,
    RPC_URL,
    CHAIN_ID,
    SYMBOL,
    PRIVATE_KEY,
    URL,
};
