import { ComicStoreReducer, IComicStore } from './data-layer/comic/reducer';
import { combineReducers } from 'redux';

export interface IRootState {
    data: {
        comic: IComicStore
    }
}

export const RootState = combineReducers({
    data: combineReducers({
        comic: ComicStoreReducer
    })
});
