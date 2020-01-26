import * as chai from 'chai';
import * as request from "request-promise";
import * as sinon from 'sinon';
import { Crawler } from "../src/crawler";

const expect = chai.expect;

describe("Crawler", () => {
    before(() => {
        const requestStub = sinon.stub()
        requestStub.withArgs('test.com/').returns(Promise.resolve(
            'href="/a"\nhref="/b"'
        ));
        requestStub.withArgs('test.com/a').returns(Promise.resolve(
            'href="/b"'
        ));
        requestStub.withArgs('test.com/b').returns(Promise.resolve(
            'href="/a"'
        ));
        sinon.replace(request, 'get', requestStub);
    });

    describe("relative url pattern", () => {
        it("matches zero subdomains", () => {
            const shouldMatchString = '/';
            const actual = new RegExp(Crawler.relativeUrlPattern)
                .exec(shouldMatchString);
            expect(actual).not.to.be.null;
        });

        it("matches single subdomains", () => {
            const shouldMatchString = '/foo';
            const actual = new RegExp(Crawler.relativeUrlPattern)
                .exec(shouldMatchString);
            expect(actual).not.to.be.null;
        });

        it("matches multiple subdomains", () => {
            const shouldMatchString = '/foo/bar';
            const actual = new RegExp(Crawler.relativeUrlPattern)
                .exec(shouldMatchString);
            expect(actual).not.to.be.null;
        })
    });

    describe("URL extraction", () => {
        it("fetches valid relative URLs", () => {
            const webCrawler = new Crawler('foo');
            const actual = webCrawler.extractURLs(
                'href="/"\nhref="/bar"\nhref="/bar/buzz"\nhref="buzz"'
            );
            expect(actual.has('/')).to.be.true;
            expect(actual.has('/bar')).to.be.true;
            expect(actual.has('/bar/buzz')).to.be.true;
            expect(actual.has('buzz')).to.be.false;
        });
    });

    describe("build page map", () => {
        it("steps through connected pages", async () => {
            const webCrawler = new Crawler('test.com');
            await webCrawler.buildPageMap();
            const actual = webCrawler.pageMap;
            expect(actual.size).to.equal(3);
            expect(actual.has('/')).to.be.true;
            expect(actual.has('/a')).to.be.true;
            expect(actual.has('/b')).to.be.true;
            expect(actual.has('/c')).to.be.false;
        });
    });
});
