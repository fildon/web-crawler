import * as request from "request";

export class Crawler{
    public domain: string;
    public static subDomainPattern = '/\\w+';
    public static relativeUrlPattern = `(/|(${Crawler.subDomainPattern})+)`;
    public absoluteUrlPattern: string;
    public urlPattern: RegExp;
    public constructor(domain: string) {
        this.domain = domain;
        this.absoluteUrlPattern = `${domain}(${Crawler.subDomainPattern})*`;
        this.urlPattern = new RegExp(
            `href="((${this.absoluteUrlPattern}|${Crawler.relativeUrlPattern})/?)"`,
            'g'
        );
    }

    public async fetchHTML(): Promise<string> {
        return new Promise(resolve => {
            request(this.domain, (err, response, body) => {
                resolve(body);
            });
        })
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
