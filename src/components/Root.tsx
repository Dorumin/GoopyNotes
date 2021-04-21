import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux';

import GlobalErrorBoundary from './GlobalErrorBoundary';
import I18nProvider from './I18nProvider';
import App from './App';

export default function Root() {
    return (
        <GlobalErrorBoundary>
            <I18nProvider>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </I18nProvider>
        </GlobalErrorBoundary>
    );
}
