import { FetchLatestComicFail, FetchLatestComicSuccess } from './FetchLatestComic';
import { FetchSpecificComicFail, FetchSpecificComicSuccess } from './FetchSpecificComic';
import { TriggerLoading } from './TriggerLoading';

export type ComicDataActions = (
    FetchLatestComicFail |
    FetchLatestComicSuccess |
    FetchSpecificComicFail |
    FetchSpecificComicSuccess |
    TriggerLoading
);