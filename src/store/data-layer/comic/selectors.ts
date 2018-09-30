import { IRootState } from '../../rootReducer';
import { ComicVM } from '../../../models/view-models/ComicVM';

export function getCurrentComic(state: IRootState) {
    const comicDM = state.data.comic.currentComic;
    if (comicDM) {
        return new ComicVM(comicDM);
    }
    return null;
}

export function getCurrentPage(state: IRootState) {
    return state.data.comic.currentPage;
}

export function getMaxPage(state: IRootState) {
    return state.data.comic.maxPage;
}

export function isLoading(state: IRootState) {
    return state.data.comic.loading;
}
