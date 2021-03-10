import { ADD_NOTE, Note, NotesActions } from '../actions';

export type NotesState = Array<Note>;

const initialState: NotesState = [];

export default function notes(state = initialState, action: NotesActions): NotesState {
    const { type, payload } = action;

    switch (type) {
        case ADD_NOTE: {
            let note: Note;

            if (payload.type === 'encrypted') {
                const { type, title, encryptedContent, checksum } = payload;
                note = {
                    id: Date.now(),
                    type,
                    title,
                    encryptedContent,
                    checksum,
                    created: Date.now(),
                    modified: Date.now()
                };
            } else {
                const { type, title, content } = payload;
                note = {
                    id: Date.now(),
                    type,
                    title,
                    content,
                    created: Date.now(),
                    modified: Date.now()
                };
            }

            return [
                ...state,
                note
            ];
        }
        default:
            return state;
    }
}
