import { ComicDM } from '../data-models/ComicDM';
export class ComicVM {
    public month: string;
    public year: string;
    public safe_title: string;
    public alt: string;
    public img: string;
    public day: string;

    constructor(dm?: ComicDM) {
        this.month = dm ? dm.month : "";
        this.year = dm ? dm.year : "";
        this.safe_title = dm ? dm.safe_title : "";
        this.alt = dm ? dm.alt : "";
        this.img = dm ? dm.img : "";
        this.day = dm ? dm.day : "";
    }
}