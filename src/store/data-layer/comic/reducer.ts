import { ComicDataActions } from './actions/index';
import { ComicDataTypes } from './types';
import { ComicDM } from '../../../models/data-models/ComicDM';

export interface IComicStore {
    loading: boolean;
    currentComic?: ComicDM;
    currentPage: number;
    maxPage: number;
    setCurrentComic(currentComic: ComicDM): IComicStore;
    setCurrentPage(currentPage: number): IComicStore;
    setMaxPage(maxPage: number): IComicStore;
    startLoading() :IComicStore;
}

class ComicStore implements IComicStore {
    public currentComic?: ComicDM;
    public currentPage: number;
    public maxPage: number;
    public loading: boolean;

    constructor(
        currentPage: number = -1,
        maxPage: number = -1,
        loading: boolean = true,
        currentComic?: ComicDM
    ) {
        this.currentComic = currentComic;
        this.currentPage = currentPage;
        this.maxPage = maxPage;
        this.loading = loading;
    }
    
    public setCurrentComic(currentComic: ComicDM): IComicStore {
        return new ComicStore(this.currentPage, this.maxPage, false, currentComic);
    }

    public setCurrentPage(currentPage: number): IComicStore {
        return new ComicStore(currentPage, this.maxPage, false, this.currentComic);
    }

    public setMaxPage(maxPage: number): IComicStore {
        return new ComicStore(this.currentPage, maxPage, false, this.currentComic);
    }

    public startLoading(): IComicStore {
        return new ComicStore(-1, this.maxPage, true);
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
        case ComicDataTypes.TRIGGER_LOADING:
            return state
                    .startLoading();
        case ComicDataTypes.FETCH_SPECIFIC_COMIC_FAIL:
        case ComicDataTypes.FETCH_LATEST_COMIC_FAIL:
            return state;
        default:
            return state;
    }
}