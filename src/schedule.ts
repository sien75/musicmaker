// provides the ability to schedule notes

import { forEach } from 'ramda';

import { createSampler, Timbre } from './inners/createSampler';

import { NoteCreaterJSON } from './jsonType';

export type ScheduleSampler = {
    scheduleNote: (notes: NoteCreaterJSON[]) => void;
};

export const createScheduleSampler = async (
    timbre: Timbre
): Promise<ScheduleSampler> => {
    const sampler = await createSampler(timbre);
    sampler.sync();
    return {
        scheduleNote: (notes: NoteCreaterJSON[]) => {
            forEach((note) => {
                sampler.triggerAttackRelease(
                    note.name,
                    note.duration,
                    note.time,
                    note.velocity
                );
            }, notes);
        },
    };
};

export { scheduleDrawOfNote, scheduleDrawAtTime } from './inners/scheduleDraw';

export { start, pause, stop, cancelScheduled } from './inners/transport';
