// the "Sampler" is provided by Tonejs library
// it is an instrument(tone source) able to play specefic pitch and timbre
// the "Channel" is provided by Tonejs library
// with "Channel", we can combine the sounds of multiple tracks
// the "Transport" is provided by Tonejs library
// it controls the time
// the "Track" defines a format for midi score
import { Sampler, Channel, Transport } from 'tone';
export default class Tone {
    constructor() {
        // each sampler represents an instrument
        this.samplers = {};
    }
    addTimbre({ number, baseUrl, urls }) {
        this.samplers[number] = new Sampler({
            urls,
            baseUrl,
            release: 1,
        }).connect(new Channel().toDestination());
    }
    // for "play" component to play single note on mouse down or key down
    playSingle(number, note, velocity) {
        this.samplers[number].triggerAttack(note, undefined, velocity ?? 1);
    }
    cancelSingle(number, note) {
        this.samplers[number].triggerRelease(note);
    }
    // for "show" component to arrange multi notes according to midi score
    scheduleMulti(track) {
        console.log('schedule multi', { track });
        const ids = [];
        // set new triggers of each sampler
        const { notes, instrument: { number }, } = track;
        for (const { time, duration, name: note, velocity } of notes) {
            ids.push(Transport.schedule((_time) => this.samplers[number].triggerAttackRelease(note, duration, _time, velocity), time));
        }
        return ids;
    }
    // for "arrange" component to schedule single note
    scheduleSingle(number, note, time, duration, velocity) {
        return Transport.schedule((_time) => this.samplers[number].triggerAttackRelease(note, duration, _time, velocity ?? 1), time);
    }
    // cancel the notes scheduled by "show" and "arrange" component
    cancelSchedule(id) {
        if (typeof id === 'number') {
            Transport.clear(id);
        }
        else {
            id.forEach((_id) => Transport.clear(_id));
        }
    }
    // sync samplers to Transport before schedule
    // ensure that only one MusicMaker instance holds the Transport resource at a time
    sync() {
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
    // start, pause and stop methods
    start() {
        if (window._musicmaker_current === this) {
            Transport.start();
        }
    }
    pause() {
        if (window._musicmaker_current === this) {
            Transport.pause();
        }
    }
    stop() {
        if (window._musicmaker_current === this) {
            Transport.stop();
        }
    }
    // throw the elapsed time from Transport's start
    // the graphic part should be timed to match the tone part
    getElapsedTime() {
        return window._musicmaker_current === this
            ? Transport.getSecondsAtTime(Transport.now())
            : 0;
    }
}
