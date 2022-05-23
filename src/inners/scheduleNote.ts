// provides the ability to schedule single or multiple note(s)

// the "TrackJSON" is a combination of multiple notes
// it defines a format of midi score

import { curry, map } from 'ramda';

import { Transport } from 'tone';
import { TrackJSON } from '@tonejs/midi';

import { NoteJSON } from './jsonType';
import { Instrument } from '../instrument';

export const scheduleSingleNote = curry(
    (instrument: Instrument, { name, time, duration, velocity }: NoteJSON) => {
        return Transport.schedule(
            (_time) =>
                instrument.triggerAttackRelease(
                    name,
                    duration,
                    _time,
                    velocity
                ),
            time
        );
    }
);

export const scheduleMultiNote = curry(
    (instrument: Instrument, track: TrackJSON) => {
        const { notes } = track;
        const scheduleSingleNoteOfInstrument = scheduleSingleNote(instrument);
        return map(scheduleSingleNoteOfInstrument, notes);
    }
);
