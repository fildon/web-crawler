import { WebCrawler } from "./webCrawler";

new WebCrawler()
    .crawl()
    .then(text => console.log(text))
    .catch(err => console.log(err));
