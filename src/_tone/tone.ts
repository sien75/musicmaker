// the "Sampler" is provided by Tonejs library
// it is an instrument(tone source) able to play specefic pitch and timbre

// the "Channel" is provided by Tonejs library
// with "Channel", we can combine the sounds of multiple tracks

// the "Transport" is provided by Tonejs library
// it controls the time

// the 'start' as 'autoStart' is provided by Tonejs library
// it starts the audio context on a click or keypress event handler

// the "Track" defines a format for midi score

import { Sampler, Channel, Transport, start as _audioStart } from 'tone';
import { Track } from '@tonejs/midi';
import { Tone, Samplers, Timbre } from '../_types';

export default class _Tone implements Tone {
    // each sampler represents an instrument
    public samplers: Samplers = {};

    public addTimbre({ number, baseUrl, urls }: Timbre): void {
        this.samplers[number] = new Sampler({
            urls,
            baseUrl,
            release: 1,
        }).connect(new Channel().toDestination());
    }

    // for "play" component to play single note on mouse down or key down

    public playSingle(number: number, note: string, velocity?: number): void {
        this.samplers[number].triggerAttack(note, undefined, velocity ?? 1);
    }

    public cancelSingle(number: number, note: string): void {
        this.samplers[number].triggerRelease(note);
    }

    // for "show" component to arrange multi notes according to midi score

    public scheduleMulti(track: Track): number[] {
        console.log('schedule multi', { track });
        const ids: number[] = [];
        // set new triggers of each sampler
        const {
            notes,
            instrument: { number },
        } = track;
        for (const { time, duration, name: note, velocity } of notes) {
            ids.push(
                Transport.schedule(
                    (_time) =>
                        this.samplers[number].triggerAttackRelease(
                            note,
                            duration,
                            _time,
                            velocity
                        ),
                    time
                )
            );
        }
        return ids;
    }

    // for "arrange" component to schedule single note

    public scheduleSingle(
        number: number,
        note: string,
        time: number,
        duration: number,
        velocity?: number
    ): number {
        return Transport.schedule(
            (_time) =>
                this.samplers[number].triggerAttackRelease(
                    note,
                    duration,
                    _time,
                    velocity ?? 1
                ),
            time
        );
    }

    // cancel the notes scheduled by "show" and "arrange" component

    public cancelSchedule(id: number | number[]): void {
        if (typeof id === 'number') {
            Transport.clear(id as number);
        } else {
            (id as number[]).forEach((_id) => Transport.clear(_id));
        }
    }

    // sync samplers to Transport before schedule
    // ensure that only one MusicMaker instance holds the Transport resource at a time

    public sync(): boolean {
        if (window._musicmaker_current !== this) {
            if (window._musicmaker_current) {
                Transport.stop();
                for (const index in window._musicmaker_current.samplers) {
                    window._musicmaker_current.samplers[index].unsync();
                }
            }
            for (const index in this.samplers) {
                this.samplers[index].sync();
            }
            window._musicmaker_current = this;
            return true;
        }
        return false;
    }

    // Tonejs start the audio context

    public async audioStart(): Promise<void> {
        _audioStart();
    }

    // start, pause and stop methods

    public start(): void {
        if (window._musicmaker_current === this) {
            Transport.start();
        }
    }
    public pause(): void {
        if (window._musicmaker_current === this) {
            Transport.pause();
        }
    }
    public stop(): void {
        if (window._musicmaker_current === this) {
            Transport.stop();
        }
    }

    // throw the elapsed time from Transport's start
    // the graphic part should be timed to match the tone part
    public getElapsedTime(): number {
        return window._musicmaker_current === this
            ? Transport.getSecondsAtTime(Transport.now())
            : 0;
    }
}
