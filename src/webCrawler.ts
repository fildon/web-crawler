import * as request from "request";

export class WebCrawler{
    public async crawl(): Promise<string> {
        return new Promise(resolve => {
            request('https://monzo.com/', (err, response, body) => {
                resolve(body);
            });
        })
    }
}
