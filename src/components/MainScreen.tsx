import { useCallback } from 'react';
import { useSelector } from '../redux';
import { Link, useHistory } from 'react-router-dom';

import './css/MainScreen.css';

import Note from './Note';
// import Dragsizable from './Dragsizable';
// import ShittyCounter from './ShittyCounter';
// import Slider from './Slider';

export default function MainScreen() {
    const notes = useSelector(state => state.notes);
    const history = useHistory();

    const onMakeNote = useCallback(() => {
        history.push('/make');
    }, [history]);

    // return <Slider min={0} max={1000} />;

    // return <ShittyCounter />;

    // return <Dragsizable />;

    return (
        <>
            <div className="background"></div>
            <main className="main-screen">
                <h1>Goopy notes</h1>
                {
                    notes.length
                        ? notes.map(note => (
                            <Note
                                note={note}
                                key={note.id}
                            />
                        ))
                        : 'You have no notes... yet!'
                }
                <button
                    className="make-note"
                    title="Make a new note"
                    onClick={onMakeNote}
                >
                    +
                </button>

                <Link to="/test">
                    Go to testing
                </Link>
            </main>
        </>
    );
}
