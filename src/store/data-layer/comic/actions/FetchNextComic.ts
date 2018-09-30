import { ComicDataTypes } from "../types"
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { HttpMethods } from '../../../../constants/HttpMethods';
import { ComicDM } from '../../../../models/data-models/ComicDM';

export function FetchNextComic(nextComicPage: number) {
    return function(dispatch: Dispatch) {
        const config: AxiosRequestConfig = {
            url: `https://xkcd.now.sh/${nextComicPage}`,
            method: HttpMethods.GET,
        };

        return axios(config)
        .then((res: AxiosResponse) => new ComicDM(res.data))
        .then((comic: ComicDM) => dispatch(FetchNextComicSuccessCreator(comic)))
        .catch((err: AxiosError) => dispatch(FetchNextComicFailCreator(err.message)));
    }
}

export interface FetchNextComicSuccess {
    nextComic: ComicDM;
    type: ComicDataTypes.FETCH_NEXT_COMIC_SUCCESS;
}

function FetchNextComicSuccessCreator(
    nextComic: ComicDM
): FetchNextComicSuccess {
    return {
        nextComic,
        type: ComicDataTypes.FETCH_NEXT_COMIC_SUCCESS
    };
}

export interface FetchNextComicFail {
    message?: string;
    type: ComicDataTypes.FETCH_NEXT_COMIC_FAIL;
}

function FetchNextComicFailCreator(
    message?: string
): FetchNextComicFail {
    return {
        message,
        type: ComicDataTypes.FETCH_NEXT_COMIC_FAIL
    };
}
