import { createStore, applyMiddleware } from "redux";
import { RootState } from './rootReducer';
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

const composeEnhancers = composeWithDevTools({
    //
})

const store = createStore(
    RootState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;