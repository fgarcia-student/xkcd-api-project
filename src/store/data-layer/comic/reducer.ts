import { ComicDataActions } from './actions/index';
import { ComicDataTypes } from './types';
import { ComicDM } from '../../../models/data-models/ComicDM';

interface IComicStore {
    currentPage: number;
    currentComic?: ComicDM;
    maxPage: number;
    setCurrentPage(currentPage: number): IComicStore;
    setCurrentComic(currentComic: ComicDM): IComicStore;
    setMaxPage(maxPage: number): IComicStore;
}

class ComicStore implements IComicStore {
    public currentPage: number;
    public currentComic?: ComicDM;
    public maxPage: number;

    constructor() {
        this.currentComic = undefined;
        this.currentPage = -1;
        this.maxPage = -1;
    }

    public setCurrentPage(currentPage: number): IComicStore {
        this.currentPage = currentPage;
        return this;
    }

    public setCurrentComic(currentComic: ComicDM): IComicStore {
        this.currentComic = currentComic;
        return this;
    }

    public setMaxPage(maxPage: number): IComicStore {
        this.maxPage = maxPage;
        return this;
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
                    .setMaxPage(action.comic.num)
                    .setCurrentPage(action.comic.num);
        case ComicDataTypes.FETCH_NEXT_COMIC_SUCCESS:
            return state;
        case ComicDataTypes.FETCH_PREV_COMIC_SUCCESS:
            return state;
        case ComicDataTypes.FETCH_LATEST_COMIC_FAIL:
        case ComicDataTypes.FETCH_NEXT_COMIC_FAIL:
        case ComicDataTypes.FETCH_PREV_COMIC_FAIL:
            return state;
        default:
            return state;
    }
}