export class ComicDM {
    public month: string;
    public num: number;
    public link: string;
    public year: string;
    public news: string;
    public safe_title: string;
    public transcript: string;
    public alt: string;
    public img: string;
    public title: string;
    public day: string;

    constructor(obj: any) {
        this.month = obj.month;
        this.num = obj.num;
        this.link = obj.link;
        this.year = obj.year;
        this.news = obj.news;
        this.safe_title = obj.safe_title;
        this.transcript = obj.transcript;
        this.alt = obj.alt;
        this.img = obj.img;
        this.title = obj.title;
        this.day = obj.day;
    }
}