const config = require("../config");

async function setupNetworkAndAccount(metamask) {
    await metamask.addNetwork({
        networkName: config.NETWORK_NAME,
        rpc: config.RPC_URL,
        chainId: config.CHAIN_ID,
        symbol: config.SYMBOL,
    });

    await metamask.importPK(config.PRIVATE_KEY);
    await metamask.switchNetwork(config.NETWORK_NAME);
}

async function login(metamask, loginButton) {
    await loginButton.click();
    await metamask.approve();
    await metamask.sign();
}

module.exports = {
    setupNetworkAndAccount,
    login,
};
