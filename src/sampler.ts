// the "Sampler" is provided by Tonejs library
// it is an instrument(tone source) able to play specefic pitch and timbre

// the "Channel" is provided by Tonejs library
// with "Channel", we can combine the sounds of multiple tracks

import memoize from './memoize';

import { Sampler, Channel } from 'tone';

interface Urls {
    [note: string]: string;
}

interface Timbre {
    urls: Urls;
    baseUrl?: string;
}

export const createSampler = memoize((timbre: Timbre) => {
    const { urls, baseUrl } = timbre;
    const sampler = new Sampler({
        urls,
        baseUrl,
        release: 1,
    }).connect(new Channel().toDestination());

    return sampler;
});
