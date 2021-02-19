import { Action } from 'redux';

import { Note } from '../types';

import { ADD_NOTE, NotesActions } from '../actions';

export type NotesState = Array<Note>;

const initialState: NotesState = [];

export default function(state = initialState, action: NotesActions): NotesState {
    switch (action.type) {
        case ADD_NOTE:
            const { type, title, content } = action.payload;

            return [
                ...state,
                {
                    id: Date.now(),
                    type,
                    title,
                    content,
                    created: Date.now(),
                    modified: Date.now()
                }
            ];
        default:
            return state;
    }
}
