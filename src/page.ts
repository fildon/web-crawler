export class Page {
    public url: string;
    public html: string;
    public constructor(url: string, html: string) {
        this.url = url;
        this.html = html;
    }
}