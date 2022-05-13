// provides the ability to schedule multiple notes
// to support the "show" scene

// provides the ability to schedule single note
// to support the "arrange" scene

// the "Track" is a combination of multiple notes
// it defines a format for midi score

import { curry, map } from 'lodash/fp';

import { Sampler, Transport } from 'tone';
import { Track } from '@tonejs/midi';

export const scheduleSingle = curry(
    (
        sampler: Sampler,
        note: string,
        time: number,
        duration: number,
        velocity: number
    ) => {
        return Transport.schedule(
            (_time) =>
                sampler.triggerAttackRelease(note, duration, _time, velocity),
            time
        );
    }
);

export const scheduleMulti = curry((sampler: Sampler, track: Track) => {
    const { notes } = track;
    return map(
        ({ time, duration, name: note, velocity }) =>
            scheduleSingle(sampler, note, time, duration, velocity),
        notes
    );
});

export const cancelSchedule = curry((id: number) => {
    Transport.clear(id);
});
