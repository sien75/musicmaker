// provides the ability to play single note
// to support the "play" scene

import { curry } from 'ramda';

import { Sampler } from 'tone';

export const playSingle = curry(
    (sampler: Sampler, note: string, velocity: number) => {
        sampler.triggerAttack(note, undefined, velocity);
    }
);

export const cancelPlaySingle = curry((sampler: Sampler, note: string) => {
    sampler.triggerRelease(note);
});
