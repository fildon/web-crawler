import { Crawler } from "./crawler";

const webCrawler = new Crawler('https://monzo.com');
webCrawler
    .fetchHTML()
    .then(html => console.log(webCrawler.extractURLs(html)))
    .catch(err => console.log(err));
