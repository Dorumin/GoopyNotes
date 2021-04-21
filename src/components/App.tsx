import { Suspense, Component, lazy } from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';

import MainScreen from './MainScreen';
import MakeScreen from './MakeScreen';
import TestScreen from './TestScreen';
// import NoteScreen from './NoteScreen';
const NoteScreen = lazy(() => import('./NoteScreen'));

const Router: typeof Component = location.origin === 'file://'
    ? HashRouter
    : BrowserRouter;

export default function App() {
    return (
        <Suspense fallback={<div></div>}>
            <Router>
                <Switch>
                    <Route path="/make" component={MakeScreen} />
                    <Route path="/test" component={TestScreen} />
                    <Route path="/note/:id" component={NoteScreen} />
                    <Route path="/" component={MainScreen} />
                </Switch>
            </Router>
        </Suspense>
    );
}
