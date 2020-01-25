import { WebCrawler } from "../src/webCrawler";

describe("Web Crawler", () => {
    it("retrieves a string", () => {
        const webCrawler = new WebCrawler();
        // Mocha will pass this test if and only if,
        // the following returned promise resolves
        return webCrawler.crawl();
    });
});
