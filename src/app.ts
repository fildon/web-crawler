import { Crawler } from "./crawler";

const url = 'https://monzo.com';
console.log(`Building map for ${url}`);
const webCrawler = new Crawler(url);
webCrawler
    .buildPageMap()
    .then(pageMap => {
        console.log(pageMap);
        console.log(`Visited ${pageMap.size} pages`);
        return;
    })
    .catch(err => console.log(err));
