import { ComicDataTypes } from '../types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { HttpMethods } from '../../../../constants/HttpMethods';
import { ComicDM } from 'src/models/data-models/ComicDM';
import { Dispatch } from 'redux';
import { TriggerLoadingCreator } from './TriggerLoading';

export function FetchLatestComic() {
    return function(dispatch: Dispatch) {
        dispatch(TriggerLoadingCreator());
        const config: AxiosRequestConfig = {
            url: "https://xkcd.now.sh/",
            method: HttpMethods.GET,
        };
        
        return axios(config)
        .then((res: AxiosResponse) => new ComicDM(res.data))
        .then((comic: ComicDM) => dispatch(FetchLatestComicSuccessCreator(comic)))
        .catch((err: AxiosError) => dispatch(FetchLatestComicFailCreator(err.message)));
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
