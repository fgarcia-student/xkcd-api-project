import { FetchLatestComicFail, FetchLatestComicSuccess } from './FetchLatestComic';
import { FetchSpecificComicFail, FetchSpecificComicSuccess } from './FetchSpecificComic';

export type ComicDataActions = (
    FetchLatestComicFail |
    FetchLatestComicSuccess |
    FetchSpecificComicFail |
    FetchSpecificComicSuccess
);