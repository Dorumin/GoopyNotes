import React from 'react';
import { Link } from 'react-router-dom';

import { Note as NoteType } from '../redux/actions';

import './css/Note.css';

type NoteProps = {
    note: NoteType;
}

export default function Note({ note }: NoteProps) {
    return (
        <Link
            className="note"
            to={`/note/${note.id}`}
        >
                <h2 className="note-title">{note.title}</h2>
                <div className="note-content">{
                    note.type === 'encrypted'
                        ? 'This note is encrypted!'
                        : note.content
                }</div>
        </Link>
    );
}
