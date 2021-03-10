import { CounterActions } from './counter';
import { NotesActions } from './notes';

export * from './counter';
export * from './notes';

export type PossibleActions = CounterActions | NotesActions;
