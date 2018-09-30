import { ComicDataTypes } from '../types';
import { Dispatch } from 'redux';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { HttpMethods } from '../../../../constants/HttpMethods';
import { ComicDM } from '../../../../models/data-models/ComicDM';

export function FetchPreviousComic(prevComicPage: number) {
    return function(dispatch: Dispatch) {
        const config: AxiosRequestConfig = {
            url: `https://xkcd.now.sh/${prevComicPage}`,
            method: HttpMethods.GET,
        };

        return axios(config)
        .then((res: AxiosResponse) => new ComicDM(res.data))
        .then((comic: ComicDM) => dispatch(FetchPreviousComicSuccessCreator(comic)))
        .catch((err: AxiosError) => dispatch(FetchPreviousComicFailCreator(err.message)));
    }
}

export interface FetchPreviousComicSuccess {
    prevComic: ComicDM;
    type: ComicDataTypes.FETCH_PREV_COMIC_SUCCESS;
}

function FetchPreviousComicSuccessCreator(
    prevComic: ComicDM
): FetchPreviousComicSuccess {
    return {
        prevComic,
        type: ComicDataTypes.FETCH_PREV_COMIC_SUCCESS
    };
}

export interface FetchPreviousComicFail {
    message?: string;
    type: ComicDataTypes.FETCH_PREV_COMIC_FAIL;
}

function FetchPreviousComicFailCreator(
    message?: string
): FetchPreviousComicFail {
    return {
        message,
        type: ComicDataTypes.FETCH_PREV_COMIC_FAIL
    };
}
