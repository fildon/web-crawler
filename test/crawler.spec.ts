import * as chai from 'chai';
import { Crawler } from "../src/crawler";

const expect = chai.expect;

describe("Crawler", () => {
    it("retrieves a string", () => {
        // TODO this test will fail if monzo.com is unreachable...
        // ...consider stubbing out the web dependency
        const webCrawler = new Crawler('https://monzo.com');
        // Mocha will pass this test if and only if,
        // the following returned promise resolves
        return webCrawler.fetchHTML();
    });

    describe("relative url pattern", () => {
        it("matches zero subdomains", () => {
            const shouldMatchString = '/';
            const actual = new RegExp(Crawler.relativeUrlPattern).exec(shouldMatchString);
            expect(actual).not.to.be.null;
        });

        it("matches single subdomains", () => {
            const shouldMatchString = '/foo';
            const actual = new RegExp(Crawler.relativeUrlPattern).exec(shouldMatchString);
            expect(actual).not.to.be.null;
        });

        it("matches multiple subdomains", () => {
            const shouldMatchString = '/foo/bar';
            const actual = new RegExp(Crawler.relativeUrlPattern).exec(shouldMatchString);
            expect(actual).not.to.be.null;
        })
    });

    describe("URL extraction", () => {
        it("fetches valid relative and absolute URLs", () => {
            const webCrawler = new Crawler('foo');
            const actual = webCrawler.extractURLs('href="/"\nhref="/bar"\nhref="foo/"\nhref="foo/bar/buzz"\nhref="buzz"');
            expect(actual.has('/')).to.be.true;
            expect(actual.has('/bar')).to.be.true;
            expect(actual.has('foo/')).to.be.true;
            expect(actual.has('foo/bar/buzz')).to.be.true;
            expect(actual.has('buzz')).to.be.false;
        });
    });
});
