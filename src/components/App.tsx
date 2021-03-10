import { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';

import MainScreen from './MainScreen';
import MakeScreen from './MakeScreen';
import NoteScreen from './NoteScreen';

const Router: typeof Component = location.origin === 'file://'
    ? HashRouter
    : BrowserRouter;

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/make" component={MakeScreen} />
                <Route path="/note/:id" component={NoteScreen} />
                <Route path="/" component={MainScreen} />
            </Switch>
        </Router>
    );
}
