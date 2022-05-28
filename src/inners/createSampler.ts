import { Sampler, Channel } from 'tone';

export interface Timbre {
    urls: Urls;
    baseUrl?: string;
}

interface Urls {
    [note: string]: string;
}

export const createSampler = (timbre: Timbre): Promise<Sampler> =>
    new Promise((resolve, reject) => {
        const { urls, baseUrl = '' } = timbre;
        const sampler = new Sampler({
            urls,
            baseUrl,
            release: 1,
            onload() {
                resolve(sampler);
            },
            // }).toDestination();
        }).connect(new Channel().toDestination());
    });
