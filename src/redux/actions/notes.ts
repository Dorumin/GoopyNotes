export const ADD_NOTE = 'ADD_NOTE';

type BaseNote = {
    id: number;
    autosaved?: boolean;
    title: string;
    created: number;
    modified: number;
};

export type PlainNote = BaseNote & {
    type: 'text';
    content: string;
};

export type EncryptedNote = BaseNote & {
    type: 'encrypted';
    encryptedContent: string;
    checksum: string;
};

export type Note = PlainNote | EncryptedNote;

export interface NotesAddAction {
    type: typeof ADD_NOTE;
    payload: AddNoteParams
};

type AddNoteParams = {
    type: PlainNote['type'];
    title: PlainNote['title'];
    content: PlainNote['content'];
} | {
    type: EncryptedNote['type'];
    title: EncryptedNote['title'];
    encryptedContent: EncryptedNote['encryptedContent'];
    checksum: EncryptedNote['checksum'];
};

export function addNote(params: AddNoteParams): NotesAddAction {
    return {
        type: ADD_NOTE,
        payload: params
    };
}

export type NotesActions = NotesAddAction;
