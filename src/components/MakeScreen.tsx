import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addNote } from '../redux/actions';

import './css/MakeScreen.css';

export default function LoginScreen() {
    // TODO: Consider whether uncontrolled inputs with useRef are better
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [redirect, setRedirect] = useState('');

    const dispatch = useDispatch();

    const onTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onContentChange = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const onSave = useCallback(() => {
        console.log("Saving");
        dispatch(
            addNote({
                type: 'text',
                title,
                content
            })
        );
        setRedirect('/');
    }, [title, content]);
    const onLock = useCallback(() => {
        console.log("Locking");
    }, []);

    useEffect(() => {
        console.log(`${title}: ${content}`);
    }, [title, content])

    if (redirect !== '') {
        return <Redirect to={redirect} />
    }

    return (
        <div className="make-screen">
            <h1>Let's write some notes</h1>
            <div className="note-title-input-wrapper">
                <input
                    type="text"
                    className="note-title-input"
                    placeholder="Title..."
                    value={title}
                    onChange={onTitleChange}
                />
            </div>
            <div className="note-content-input-wrapper">
                <textarea
                    className="note-content-input"
                    placeholder="Content..."
                    value={content}
                    onChange={onContentChange}
                />
            </div>
            <button
                className="note-save-button"
                onClick={onSave}
            >
                Save it
            </button>
            <button
                className="note-save-button"
                onClick={onLock}
            >
                Lock it
            </button>
        </div>
    )
}
