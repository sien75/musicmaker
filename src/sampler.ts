// the "Sampler" is provided by Tonejs library
// it is an instrument(tone source) able to play specefic pitch and timbre

// the "Channel" is provided by Tonejs library
// with "Channel", we can combine the sounds of multiple tracks

import { Sampler, Channel } from 'tone';

interface Urls {
    [note: string]: string;
}

interface Timbre {
    urls: Urls;
    baseUrl?: string;
}

interface Store {
    timbre: Timbre;
    sampler: Sampler;
}

let store: Store[] = [];

export const createSampler = (timbre: Timbre) => {
    const storePiece = store.find(({ timbre: _timbre }) => timbre === _timbre);
    if (storePiece) return storePiece.sampler;

    const { urls, baseUrl } = timbre;
    const sampler = new Sampler({
        urls,
        baseUrl,
        release: 1,
    }).connect(new Channel().toDestination());

    store = [
        ...store,
        {
            timbre,
            sampler,
        },
    ];

    return sampler;
};
