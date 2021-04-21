import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counter from './counter';
import notes from './notes';

export default persistReducer(
    {
        key: 'root',
        whitelist: ['notes'],
        storage
    },
    combineReducers({
        counter,
        notes,
    })
);
