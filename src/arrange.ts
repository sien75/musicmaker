// provides the ability to schedule single notes
// to support the "arrange" scene

import { Sampler, Transport } from 'tone';

export const scheduleSingle = (
    sampler: Sampler,
    note: string,
    time: number,
    duration: number,
    velocity?: number
) => {
    return Transport.schedule(
        (_time) =>
            sampler.triggerAttackRelease(note, duration, _time, velocity ?? 1),
        time
    );
};

export const cancelScheduleSingle = (id: number) => {
        Transport.clear(id);
}
