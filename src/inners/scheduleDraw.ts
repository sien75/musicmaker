import { forEach, curry } from 'ramda';

import { Draw, Transport } from 'tone';

import { NoteCreaterJSON } from '../jsonType';

export const scheduleDrawAtTime = curry(
    (handler: (t: number) => any, times: number[]) => {
        forEach((time) => {
            Transport.schedule((_time) => {
                Draw.schedule(() => handler(time), _time);
            }, time);
        }, times);
    }
);

export const scheduleDrawOfNote = curry(
    (handler: (n: NoteCreaterJSON) => any, notes: NoteCreaterJSON[]) => {
        forEach((note) => {
            Transport.schedule((_time) => {
                Draw.schedule(() => handler(note), _time);
            }, note.time);
        }, notes);
    }
);
