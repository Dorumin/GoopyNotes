import React, { useState, useCallback } from 'react';
import { useSelector } from '../redux';
import { Redirect } from 'react-router';

import './css/MainScreen.css'
import Note from './Note';

export default function App() {
    const notes = useSelector(state => state.notes);
    const [redirect, setRedirect] = useState('');

    const onMakeNote = useCallback(() => {
        setRedirect('/make');
    }, []);

    if (redirect !== '') {
        return <Redirect to={redirect} />
    }

    return (
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
        </main>
    )
}
