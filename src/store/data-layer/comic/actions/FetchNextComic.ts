import { ComicDataTypes } from "../types"

export function FetchNextComic(): FetchNextComicTypes {
    // network request
    return {
        type: ComicDataTypes.FETCH_NEXT_COMIC_SUCCESS,
    };
}

export interface FetchNextComicSuccess {
    type: ComicDataTypes.FETCH_NEXT_COMIC_SUCCESS,
}

export interface FetchNextComicFail {
    type: ComicDataTypes.FETCH_NEXT_COMIC_FAIL,
}

type FetchNextComicTypes = (
    FetchNextComicSuccess |
    FetchNextComicFail
);
