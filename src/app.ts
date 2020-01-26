import { Crawler } from "./crawler";

const webCrawler = new Crawler('https://monzo.com');
webCrawler
    .buildPageMap()
    .then(pageMap => {
        console.log(pageMap);
        console.log(`Visited ${pageMap.size} pages`);
        return;
    })
    .catch(err => console.log(err));
