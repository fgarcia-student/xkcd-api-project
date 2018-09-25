import { ComicDataTypes } from '../types';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpMethods } from '../../../../constants/HttpMethods';
import { ComicDM } from 'src/models/data-models/ComicDM';
import { Dispatch } from 'redux';

export function FetchLatestComic() {
    return function (dispatch: Dispatch) {
        const config: AxiosRequestConfig = {
            url: "https://xkcd.now.sh/",
            method: HttpMethods.GET,
            timeout: 5000, // 5 seconds
        };
        
        return axios(config)
        .then((res: AxiosResponse) => new ComicDM(res.data))
        .then((comic: ComicDM) => dispatch(FetchLatestComicSuccessCreator(comic)))
        .catch((err) => dispatch(FetchLatestComicFailCreator(err)));
    
    }
    
}

export interface FetchLatestComicSuccess {
    comic: ComicDM;
    type: ComicDataTypes.FETCH_LATEST_COMIC_SUCCESS;
}

function FetchLatestComicSuccessCreator(
    comic: ComicDM
): FetchLatestComicSuccess {
    return {
        comic,
        type: ComicDataTypes.FETCH_LATEST_COMIC_SUCCESS
    };
}

export interface FetchLatestComicFail {
    message?: string;
    type: ComicDataTypes.FETCH_LATEST_COMIC_FAIL;
}

function FetchLatestComicFailCreator(
    message?: string
): FetchLatestComicFail {
    return {
        message,
        type: ComicDataTypes.FETCH_LATEST_COMIC_FAIL
    };
}