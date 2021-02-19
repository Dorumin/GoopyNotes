import React from 'react';

import { Note as NoteType } from '../redux/types';

import './css/Note.css';

interface NoteProps {
    note: NoteType;
}

export default function Note({ note }: NoteProps) {
    return (
        <div className="note">
            <h2 className="note-title">{note.title}</h2>
            <div className="note-content">{note.content}</div>
        </div>
    )
}
