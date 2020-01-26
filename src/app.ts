import { Crawler } from "./crawler";

const webCrawler = new Crawler('https://monzo.com');
webCrawler
    .buildPageMap()
    .then(() => {
        console.log(webCrawler.pageMap);
        console.log(`Visited ${webCrawler.pageMap.size} pages`);
        return;
    })
    .catch(err => console.log(err));
