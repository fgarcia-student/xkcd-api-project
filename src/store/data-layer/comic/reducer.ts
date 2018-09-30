import { ComicDataActions } from './actions/index';
import { ComicDataTypes } from './types';
import { ComicDM } from '../../../models/data-models/ComicDM';

export interface IComicStore {
    currentComic?: ComicDM;
    currentPage: number;
    maxPage: number;
    setCurrentComic(currentComic: ComicDM): IComicStore;
    setCurrentPage(currentPage: number): IComicStore;
    setMaxPage(maxPage: number): IComicStore;
}

class ComicStore implements IComicStore {
    public currentComic?: ComicDM;
    public currentPage: number;
    public maxPage: number;

    constructor(currentPage: number = -1, maxPage: number = -1, currentComic?: ComicDM) {
        this.currentComic = currentComic;
        this.currentPage = currentPage;
        this.maxPage = maxPage;
    }
    
    public setCurrentComic(currentComic: ComicDM): IComicStore {
        return new ComicStore(this.currentPage, this.maxPage, currentComic);
    }

    public setCurrentPage(currentPage: number): IComicStore {
        return new ComicStore(currentPage, this.maxPage, this.currentComic);
    }

    public setMaxPage(maxPage: number): IComicStore {
        return new ComicStore(this.currentPage, maxPage, this.currentComic);
    }
}

export function ComicStoreReducer(
    state: IComicStore = new ComicStore(),
    action: ComicDataActions
): IComicStore {
    switch(action.type) {
        case ComicDataTypes.FETCH_LATEST_COMIC_SUCCESS:
            return state
                    .setCurrentComic(action.comic)
                    .setCurrentPage(action.comic.num)
                    .setMaxPage(action.comic.num);
        case ComicDataTypes.FETCH_SPECIFIC_COMIC_SUCCESS:
            return state
                    .setCurrentComic(action.comic)
                    .setCurrentPage(action.comic.num);
        case ComicDataTypes.FETCH_SPECIFIC_COMIC_FAIL:
        case ComicDataTypes.FETCH_LATEST_COMIC_FAIL:
            return state;
        default:
            return state;
    }
}