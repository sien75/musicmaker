// provides the ability to schedule multiple notes
// to support the "show" scene

// the "Track" is a combination of multiple notes
// it defines a format for midi score

import { Sampler, Transport } from 'tone';
import { Track } from '@tonejs/midi';

export const scheduleMulti = (sampler: Sampler, track: Track) => {
    // set new triggers of each sampler
    const { notes } = track;
    return notes.map(({ time, duration, name: note, velocity }) => {
        return Transport.schedule(
            (_time) =>
                sampler.triggerAttackRelease(note, duration, _time, velocity),
            time
        );
    });
};

export const cancelScheduleMulti = (id: number[]) => {
    id.forEach((_id) => Transport.clear(_id));
};
