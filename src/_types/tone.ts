import { Sampler } from 'tone';
import { Track } from '@tonejs/midi';

export interface Tone {
    samplers: Samplers;
    addTimbre: ({ number, baseUrl, urls }: Timbre) => void;
    playSingle: (number: number, note: string, velocity?: number) => void;
    cancelSingle: (number: number, note: string) => void;
    scheduleMulti: (track: Track) => number[] | number;
    scheduleSingle: (
        number: number,
        note: string,
        time: number,
        duration: number,
        velocity?: number
    ) => number;
    cancelSchedule: (id: number | number[]) => void;
    sync: () => boolean;
    audioStart: () => Promise<void>;
    start: () => void;
    pause: () => void;
    stop: () => void;
    getElapsedTime: () => number;
}

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
