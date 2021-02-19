export const ADD_NOTE = 'ADD_NOTE';

export interface NotesAddAction {
    type: typeof ADD_NOTE;
    payload: AddNoteParams
};

export interface AddNoteParams {
    type: "text" | "encrypted";
    title: string;
    content: string;
}

export function addNote({ type, title, content }: AddNoteParams): NotesAddAction {
    return {
        type: ADD_NOTE,
        payload: {
            type,
            title,
            content
        }
    };
}

export type NotesActions = NotesAddAction;
