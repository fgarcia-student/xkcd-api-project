import { ComicDataTypes } from '../types';

export function FetchPreviousComic(): FetchPreviousComicTypes {
    // network request
    return {
        type: ComicDataTypes.FETCH_PREV_COMIC_SUCCESS,
    };
}

export interface FetchPreviousComicSuccess {
    type: ComicDataTypes.FETCH_PREV_COMIC_SUCCESS;
}

export interface FetchPreviousComicFail {
    type: ComicDataTypes.FETCH_PREV_COMIC_FAIL;
}

type FetchPreviousComicTypes = (
    FetchPreviousComicSuccess |
    FetchPreviousComicFail
);
