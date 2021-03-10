import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TypedUseSelectorHook, useSelector as baseUseSelector } from 'react-redux';

import reducer from './reducers';
import { PossibleActions } from './actions';

export type RootState = ReturnType<typeof reducer>;

export const store = createStore<RootState, PossibleActions, unknown, unknown>(
    reducer,
    composeWithDevTools(
        applyMiddleware()
    )
);

export const persistor = persistStore(store);

// Bound type helpers
export const useSelector: TypedUseSelectorHook<RootState> = baseUseSelector;
