import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux';

import GlobalErrorBoundary from './GlobalErrorBoundary';
import App from './App';

export default function Root() {
    return (
        <GlobalErrorBoundary>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </GlobalErrorBoundary>
    );
}
