import { Sampler } from 'tone';
import { Track } from '@tonejs/midi';
interface Samplers {
    [index: number]: Sampler;
}
interface Urls {
    [name: string]: string;
}
export interface Timbre {
    number: number;
    baseUrl: string;
    urls: Urls;
}
export default class Tone {
    samplers: Samplers;
    addTimbre({ number, baseUrl, urls }: Timbre): void;
    playSingle(number: number, note: string, velocity?: number): void;
    cancelSingle(number: number, note: string): void;
    scheduleMulti(track: Track): number[];
    scheduleSingle(number: number, note: string, time: number, duration: number, velocity?: number): number;
    cancelSchedule(id: number | number[]): void;
    sync(): boolean;
    start(): void;
    pause(): void;
    stop(): void;
    getElapsedTime(): number;
}
export {};
