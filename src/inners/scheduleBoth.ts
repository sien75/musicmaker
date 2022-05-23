import { curry, map } from 'ramda';

import { scheduleSingleNote } from './scheduleNote';
import { scheduleSingleDraw } from './scheduleDraw';

import { Instrument } from '../instrument';
import { NoteJSON } from './jsonType';

export type NoteAndDrawId = {
    note: number;
    draw: number;
};

export const scheduleSingle = curry(
    (
        instrument: Instrument,
        handler: (n: NoteJSON) => any,
        note: NoteJSON
    ): NoteAndDrawId => {
        const noteId = scheduleSingleNote(instrument, note);
        const drawId = scheduleSingleDraw(() => handler(note), note.time);
        return {
            note: noteId,
            draw: drawId,
        };
    }
);

export const scheduleMulti = curry(
    (
        instrument: Instrument,
        handler: (n: NoteJSON) => any,
        notes: NoteJSON[]
    ): NoteAndDrawId[] => {
        const scheduleSingleIH = scheduleSingle(instrument, handler);
        return map(scheduleSingleIH, notes);
    }
);
