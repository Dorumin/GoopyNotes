import { useCallback, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { decrypt } from 'tiny-encryption-algorithm';
import { sha256 } from 'js-sha256';
import assert from 'assert';
import { useSelector } from "../redux";
import Dragsizable from "./Dragsizable";

type RouteParams = {
    id: string;
}

export default function NoteScreen() {
    const params = useParams<RouteParams>();
    const id = Number(params.id);
    const note = useSelector(state => state.notes.find(note => note.id === id));

    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [errored, setErrored] = useState(false);

    const onPasswordChange = useCallback((e) => {
        setErrored(false);
        setPassword(e.target.value);
    }, []);
    const onPasswordSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Appease typescript, hopefully stripped out on prod
        assert(note.type === 'encrypted');

        try {
            const result = decrypt(note.encryptedContent, password).toString();
            if (sha256(result) !== note.checksum) throw 1; // https://www.youtube.com/watch?v=YLEpxJ5dWpU

            setContent(result);
        } catch(e) {
            setErrored(true);
        }
    }, [password, note]);

    if (note === undefined) {
        // Something has gone terribly wrong
        return <Redirect to="/" />;
    }

    return (
        <div className="note-screen">
            {note.type === 'encrypted' &&
                <form className="decrypt" onSubmit={onPasswordSubmit}>
                    {errored
                        ? 'That password was incorrect!'
                        : 'This note is encrypted!'
                    }
                    <br />
                    <input
                        type="text"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </form>
            }
            {note.type === 'encrypted' && content}
            {note.type === 'text' && note.content}
            <Link to="/">
                fuck go back
            </Link>
            <div />
            <Dragsizable />
        </div>
    );
}
