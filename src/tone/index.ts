// The "Sampler" is provided by Tonejs library.
// It is an instrument(tone source) able to play specefic pitch and timbre.

// The "Sequence" is provided by Tonejs library.
// It plays tone at a specefic time.

// The "Ttansport" is provided by Tonejs library.
// It controls the time of play.

import { Sampler, Sequence, Transport } from 'tone';

export interface Urls {
    [propName: string]: string;
}
export interface Timbre {
    baseUrl: string;
    urls: Urls;
}

export interface Score {
    url?: string;
    scoreArray?: (
        | string
        | (string | (string | (string | (string | string[])[])[])[])[]
    )[];
}

export type PlayingCallback = (
    note: string,
    duration: string,
    time: number
) => void;

export default class Tone {
    public sampler: Sampler;
    public sequence: Sequence;
    public playingCallback: PlayingCallback;

    constructor(
        timbre: Timbre,
        score: Score,
        playingCallback: PlayingCallback
    ) {
        this.sampler = this.setTimbre(timbre);
        this.sequence = this.setScore(score);
        this.playingCallback = this.setPlayingCallback(playingCallback);
    }

    setTimbre({ baseUrl, urls }: Timbre): Sampler {
        return (this.sampler = new Sampler({
            urls,
            baseUrl,
            release: 1,
        }).toDestination());
    }

    setScore({ scoreArray }: Score): Sequence {
        return (this.sequence = new Sequence(
            (time, note) => {
                this.sampler.triggerAttackRelease(note, '16n', time);
                this.playingCallback(note, '16n', time);
            },
            scoreArray,
            '4n'
        ).start(0));
    }

    setPlayingCallback(cb: PlayingCallback): PlayingCallback {
        return (this.playingCallback = cb);
    }

    play(): void {
        Transport.start();
    }

    pause(): void {
        Transport.pause();
    }

    stop(): void {
        Transport.stop();
    }
}
