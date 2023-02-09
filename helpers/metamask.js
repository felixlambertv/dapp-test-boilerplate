async function commitAllTransaction(metamask) {
    const unsignedTx = await metamask.page.$x(
        `.//button[contains(text(), 'Sign')]`
    );
    if (unsignedTx.length !== 0) {
        await metamask.sign();
    }
}

module.exports = {
    commitAllTransaction,
};
