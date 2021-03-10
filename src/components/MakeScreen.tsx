import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addNote } from '../redux/actions';
import { encrypt } from 'tiny-encryption-algorithm';
import { sha256 } from 'js-sha256';

import './css/MakeScreen.css';

export default function MakeScreen() {
    // TODO: Consider whether uncontrolled inputs with useRef are better
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [redirect, setRedirect] = useState('');

    const [locking, setLocking] = useState(false);
    const [password, setPassword] = useState('');
    const [focusPassword, setFocusPassword] = useState(false);

    const dispatch = useDispatch();

    const passwordInput = useRef<HTMLInputElement>(null);

    const onTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const onContentChange = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const onSave = useCallback(() => {
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
        if (locking) {
            if (password.trim() !== '') {
                console.log(`Locking with ${password}`);

                dispatch(
                    addNote({
                        type: 'encrypted',
                        title,
                        encryptedContent: encrypt(content, password).toString(),
                        checksum: sha256(content)
                    })
                );
                setRedirect('/');
            } else {
                setLocking(false);
            }
        } else {
            setLocking(true);
            setFocusPassword(true);
        }
    }, [locking, password, title, content]);
    const onPasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onPasswordKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            onLock();
        }
    }, [onLock]);

    // useEffect(() => {
    //     console.log(`${title}: ${content}`);
    // }, [title, content]);

    useEffect(() => {
        if (focusPassword) {
            passwordInput.current.focus();
        }
    }, [focusPassword]);

    if (redirect !== '') {
        return <Redirect to={redirect} />;
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
                type="button"
                className="note-save-button"
                onClick={onSave}
            >
                Save it
            </button>
            <button
                type="button"
                className="note-save-button"
                onClick={onLock}
            >
                Lock it
            </button>
            {
                locking && <input
                    type="password"
                    className="note-password-input"
                    ref={passwordInput}
                    onChange={onPasswordChange}
                    onKeyDown={onPasswordKeyDown}
                />
            }
        </div>
    );
}
