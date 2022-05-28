// provide the ability to trigger note

import { now } from 'tone';

import { createSampler, Timbre } from './inners/createSampler';

export type TriggerSampler = {
    triggerAttack: (name: string, time?: number, velocity?: number) => void;
    triggerRelease: (name: string, time?: number) => void;
    triggerAttackRelease: (
        name: string,
        duration: number,
        time?: number,
        velocity?: number
    ) => void;
};

export const createTriggerSampler = async (
    timbre: Timbre
): Promise<TriggerSampler> => {
    const sampler = await createSampler(timbre);
    return {
        triggerAttack(name: string, time?: number, velocity?: number) {
            const _time = time ? now() + time : undefined;
            sampler.triggerAttack(name, _time, velocity);
        },
        triggerRelease(name: string, time?: number) {
            const _time = time ? now() + time : undefined;
            sampler.triggerRelease(name, _time);
        },
        triggerAttackRelease(
            name: string,
            duration: number,
            time?: number,
            velocity?: number
        ) {
            const _time = time ? now() + time : undefined;
            sampler.triggerAttackRelease(name, duration, _time, velocity);
        },
    };
};
