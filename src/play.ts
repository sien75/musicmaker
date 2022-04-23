// provides the ability to play single note
// to support the "play" scene

import { Sampler } from 'tone';

export const playSingle = (
    sampler: Sampler,
    note: string,
    velocity?: number
) => {
    sampler.triggerAttack(note, undefined, velocity ?? 1);
};

export const cancelPlaySingle = (
    sampler: Sampler,
    note: string
) => {
    sampler.triggerRelease(note);
};
