import * as chai from "chai";
import { WebCrawler } from "../src/webCrawler";

const expect = chai.expect;

describe("Web Crawler", () => {
    it("returns foo", () => {
        const webCrawler = new WebCrawler();
        const actual = webCrawler.crawl();
        const expected = "foo";
        expect(actual).to.equal(expected);
    });
});
