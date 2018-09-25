import { createStore, applyMiddleware } from "redux";
import { RootState } from './rootReducer';
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";
import { FetchLatestComic } from './data-layer/comic/actions/FetchLatestComic';

const composeEnhancers = composeWithDevTools({
    //
})

const store = createStore(
    RootState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

// Fetch latest comic on app load
FetchLatestComic()(store.dispatch);

export default store;