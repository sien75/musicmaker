// these functions provide the ability to play single note:
// "triggerAttack", "triggerRelease" and "triggerAttackRelease"

// "sync" function sync instrument to Transport, while "unSync" do the opposite
// only synced instruments can be controlled by Transport

// the "Sampler" is provided by Tonejs library
// it is an tone source able to play specefic pitch and timbre

// the "Channel" is provided by Tonejs library
// with "Channel", we can combine the sounds of multiple tracks

import { Sampler, Channel } from 'tone';

export interface Timbre {
    urls: Urls;
    baseUrl?: string;
}

interface Urls {
    [note: string]: string;
}

export interface Instrument {
    triggerAttack: (note: string, velocity: number) => void;
    triggerRelease: (note: string) => void;
    triggerAttackRelease: (
        note: string,
        time: number,
        duration: number,
        velocity: number
    ) => void;
    sync: () => void;
    unSync: () => void;
}

export const createInstrument = (timbre: Timbre): Promise<Instrument> =>
    new Promise((resolve, reject) => {
        const { urls, baseUrl } = timbre;
        const sampler = new Sampler({
            urls,
            baseUrl,
            // release: 1,
            onload() {
                resolve(getInstrumentFunctions(sampler));
            },
        }).connect(new Channel().toDestination());
    });

const getInstrumentFunctions = (sampler: Sampler): Instrument => {
    // remove the return value of sampler.xxx functions
    return {
        // triggerAttack time is set to infinite
        triggerAttack(note: string, velocity: number) {
            sampler.triggerAttack(note, undefined, velocity);
        },
        triggerRelease(note: string) {
            sampler.triggerRelease(note);
        },
        // adjust input params order
        triggerAttackRelease(
            note: string,
            time: number,
            duration: number,
            velocity: number
        ) {
            sampler.triggerAttackRelease(note, duration, time, velocity);
        },
        sync() {
            sampler.sync();
        },
        unSync() {
            sampler.unsync();
        },
    };
};
