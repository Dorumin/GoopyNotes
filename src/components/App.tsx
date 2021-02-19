import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from '../redux';

import MainScreen from './MainScreen';
import MakeScreen from './MakeScreen';

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/make" component={MakeScreen} />
                    <Route path="/" component={MainScreen} />
                </Switch>
            </Router>
        </Provider>
    )
}
