import * as request from "request-promise";
import { Page } from "./page";

export class Crawler{
    public domain: string;
    public static subDomainPattern = '/\\w+';
    public static relativeUrlPattern
        = `(/|(${Crawler.subDomainPattern})+)`;
    public urlPattern: RegExp;
    public pageMap: Map<string, Set<string>>;
    public constructor(domain: string) {
        this.domain = domain;
        this.urlPattern = new RegExp(
            `href="(${Crawler.relativeUrlPattern}/?)"`,
            'g'
        );
        this.pageMap = new Map();
    }

    public async buildPageMap(): Promise<void> {
        let urlsToVisit = ['/'];
        while (urlsToVisit.length > 0) {
            const pages = await Promise.all(
                urlsToVisit.map(url => this.fetchHTML(url))
            );
            pages.forEach(page => {
                const childURLs = this.extractURLs(page.html);
                this.pageMap.set(page.url, childURLs);
                childURLs.forEach(childURL => {
                    urlsToVisit.push(childURL);
                });
            })
            urlsToVisit = urlsToVisit.filter(
                url => !this.pageMap.has(url)
            );
        }
    }

    public async fetchHTML(relativePath: string): Promise<Page> {
        return request.get(this.domain + relativePath)
            .then(html => {
                return new Page(relativePath, html);
            });
    }

    public extractURLs(html: string): Set<string> {
        let match;
        const results = new Set<string>();
        while ((match = this.urlPattern.exec(html)) !== null) {
            results.add(match[1]);
        }
        return results;
    }
}
