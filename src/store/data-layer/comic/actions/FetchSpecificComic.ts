import { ComicDataTypes } from '../types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { HttpMethods } from '../../../../constants/HttpMethods';
import { ComicDM } from 'src/models/data-models/ComicDM';
import { Dispatch } from 'redux';
import { TriggerLoadingCreator } from './TriggerLoading';

export function FetchSpecificComic(comicPage: number) {
    return function(dispatch: Dispatch) {
        dispatch(TriggerLoadingCreator());
        const config: AxiosRequestConfig = {
            url: `https://xkcd.now.sh/${comicPage}`,
            method: HttpMethods.GET,
        };
        
        return axios(config)
        .then((res: AxiosResponse) => new ComicDM(res.data))
        .then((comic: ComicDM) => dispatch(FetchSpecificComicSuccessCreator(comic)))
        .catch((err: AxiosError) => dispatch(FetchSpecificComicFailCreator(err.message)));
    }
}

export interface FetchSpecificComicSuccess {
    comic: ComicDM;
    type: ComicDataTypes.FETCH_SPECIFIC_COMIC_SUCCESS;
}

function FetchSpecificComicSuccessCreator(
    comic: ComicDM
): FetchSpecificComicSuccess {
    return {
        comic,
        type: ComicDataTypes.FETCH_SPECIFIC_COMIC_SUCCESS
    };
}

export interface FetchSpecificComicFail {
    message?: string;
    type: ComicDataTypes.FETCH_SPECIFIC_COMIC_FAIL;
}

function FetchSpecificComicFailCreator(
    message?: string
): FetchSpecificComicFail {
    return {
        message,
        type: ComicDataTypes.FETCH_SPECIFIC_COMIC_FAIL
    };
}
