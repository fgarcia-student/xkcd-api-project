import { FetchLatestComicFail, FetchLatestComicSuccess } from './FetchLatestComic';
import { FetchNextComicFail, FetchNextComicSuccess } from './FetchNextComic';
import { FetchPreviousComicFail, FetchPreviousComicSuccess } from './FetchPreviousComic';

export type ComicDataActions = (
    FetchLatestComicFail |
    FetchLatestComicSuccess |
    FetchNextComicFail |
    FetchNextComicSuccess |
    FetchPreviousComicFail |
    FetchPreviousComicSuccess
);