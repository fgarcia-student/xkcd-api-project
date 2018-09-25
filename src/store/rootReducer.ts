import { ComicStoreReducer } from './data-layer/comic/reducer';
import { combineReducers } from 'redux';

export const RootState = combineReducers({
    data: combineReducers({
        comic: ComicStoreReducer,
    })
});
