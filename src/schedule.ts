// provides the ability to schedule single or multiple note(s)

// the "Track" is a combination of multiple notes
// it defines a format of midi score

import { curry, map } from 'ramda';

import { Transport } from 'tone';
import { Track } from '@tonejs/midi';

import { Instrument } from './instrument';

export const scheduleSingle = curry(
    (
        instrument: Instrument,
        note: string,
        time: number,
        duration: number,
        velocity: number
    ) => {
        return Transport.schedule(
            (_time) =>
                instrument.triggerAttackRelease(
                    note,
                    duration,
                    _time,
                    velocity
                ),
            time
        );
    }
);

export const scheduleMulti = curry((instrument: Instrument, track: Track) => {
    const { notes } = track;
    return map(
        ({ time, duration, name: note, velocity }) =>
            scheduleSingle(instrument, note, time, duration, velocity),
        notes
    );
});

export const cancelSchedule = curry((id: number) => {
    Transport.clear(id);
});
