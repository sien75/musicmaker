import type { Sampler } from 'tone';

export interface Samplers {
    [index: number]: Sampler;
}

export interface Urls {
    [name: string]: string;
}

export interface Timbre {
    number: number;
    baseUrl: string;
    urls: Urls;
}
