import { createStore, Action, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useSelector as baseUseSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer>

const store = createStore<RootState, Action<any>, unknown, unknown>(
    rootReducer,
    composeWithDevTools(
        applyMiddleware()
    )
);

// Bound type helpers
const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;

export {
    store,
    useSelector
};
