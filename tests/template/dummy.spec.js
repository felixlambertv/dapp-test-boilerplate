const chai = require("chai");
const { expect } = chai;
const puppeteer = require("puppeteer");
const dappeteer = require("@chainsafe/dappeteer");
const { setupNetworkAndAccount, login } = require("../../helpers/account");
const { commitAllTransaction } = require("../../helpers/metamask");
const config = require("../../config");

describe("Homepage", () => {
    let testUrl = config.URL;
    let metamask;
    let page;
    before(async () => {
        [metamask, page] = await dappeteer.bootstrap(puppeteer, {
            metamaskVersion: "v10.15.0",
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null,
        });
        await setupNetworkAndAccount(metamask);
        await page.goto(testUrl);
        await page.bringToFront();
        const loginButton = await page.waitForXPath(
            '//*[@id="home"]/header/div/div/div[2]/button'
        );
        await login(metamask, loginButton);
    });

    beforeEach(async () => {
        //Sign any unsigned transaction on metamask
        await commitAllTransaction(metamask);
    });

    afterEach(async () => {
        // Bring back to homepage
        await page.goto(testUrl);
        await page.bringToFront();
    });

    after(async () => {
        await page.close();
    });

    describe("Positive case @positive", () => {
        it("should success go to worldmap when have correct network", async () => {
            await page.waitForNavigation();
            const pageUrl = await page.url();
            expect(pageUrl, "page url not correct").to.eq(
                `${testUrl}/world-map`
            );
        });
    });

    describe("Negative case @negative", () => {
        it("should showing popup to switch network when the network is not valid", async () => {
            await metamask.switchNetwork("goerli");
            const modal = await page.waitForXPath(
                '//*[@id="root"]/section/div[2]/button'
            );
            expect(modal, "should showing popup").to.not.null;
        });
    });
});
