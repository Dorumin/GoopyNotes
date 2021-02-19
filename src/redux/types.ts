export interface Note {
    id: number;
    type: "text" | "encrypted";
    autosaved?: boolean;
    title: string;
    content: string;
    created: number;
    modified: number;
}
