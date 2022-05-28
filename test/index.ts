import {
    getContextState,
    resume,
    createTriggerSampler,
    TriggerSampler,
    convertToMidiJSONFromUrl,
    convertToUint8ArrayFromMidiJSON,
    convertToMidiJSONFromArrayBuffer,
    createScheduleSampler,
    ScheduleSampler,
    scheduleDrawOfNote,
    scheduleDrawAtTime,
    cancelScheduled,
    start,
    pause,
    stop,
    createMidiJSON,
    appendNotesToMidiJSON,
    MidiJSON,
    TrackJSON,
    NoteJSON,
    NoteCreaterJSON,
    TrackCreaterJSON,
} from 'musicmaker';

document.body.innerHTML = `
    <button id="b1">getContextState</button><br />
    <button id="b2">resume</button><br />
    <br/>
    <button id="b3">createTriggerSampler</button><br />
    <button id="b4">triggerAttack</button><br />
    <button id="b5">triggerRelease</button><br />
    <button id="b6">triggerAttackRelease</button><br />
    <br/>
    <button id="b7">convert</button><br />
    <button id="b8">createScheduleSampler</button><br />
    <button id="b9">scheduleNote</button><br />
    <button id="b10">scheduleDrawOfNote</button>
        &nbsp;piano note name: <span id="b10-1"></span><br />
    <button id="b11">scheduleDrawAtTime</button>
        &nbsp;time: <span id="b10-2"></span><br />
    <button id="b12">cancelScheduled</button><br />
    <br />
    <button id="b13">start</button><br />
    <button id="b14">pause</button><br />
    <button id="b15">stop</button><br />
    <br/>
    <button id="b16">createMidiJSON</button><br />
    <button id="b17">appendNotesToMidiJSON</button><br />
    <button id="b18"></button><br />
    <br/>
`;

const id = (id: string) => document.querySelector(`#${id}`) as HTMLElement;

id('b1').onclick = () => console.log(getContextState());

id('b2').onclick = async () => {
    await resume();
    console.log('resumed');
};

let triggerSampler: TriggerSampler;
id('b3').onclick = async () => {
    triggerSampler = await createTriggerSampler({
        baseUrl: '',
        urls: {
            C4: (await import('./resources/C4.mp3')).default,
        },
    });
    console.log('trigger sampler created!');
};

id('b4').onclick = () => {
    if (!triggerSampler) return;
    triggerSampler.triggerAttack('C4');
    triggerSampler.triggerAttack('D4', 1);
    triggerSampler.triggerAttack('E4', 2, 0.5);
};

id('b5').onclick = () => {
    if (!triggerSampler) return;
    triggerSampler.triggerRelease('C4');
    triggerSampler.triggerRelease('D4');
    triggerSampler.triggerRelease('E4', 1);
};

id('b6').onclick = () => {
    if (!triggerSampler) return;
    triggerSampler.triggerAttackRelease('C4', 1, undefined, 0.5);
    triggerSampler.triggerAttackRelease('D4', 1, 1, 0.5);
    triggerSampler.triggerAttackRelease('E4', 1, 2, 0.5);
    triggerSampler.triggerAttackRelease('F4', 1, 3);
    triggerSampler.triggerAttackRelease('G4', 1, 4);
    triggerSampler.triggerAttackRelease('A4', 1, 5);
    triggerSampler.triggerAttackRelease('B4', 1, 6);
};

let midiJSON: MidiJSON;
id('b7').onclick = async () => {
    const midiUrl = (await import('./resources/test.mid')).default;
    const _midiJSON = await convertToMidiJSONFromUrl(midiUrl);
    const u8a = convertToUint8ArrayFromMidiJSON(_midiJSON);
    midiJSON = convertToMidiJSONFromArrayBuffer(u8a);
    console.log(midiJSON);
};

let scheduleSampler: ScheduleSampler;
id('b8').onclick = async () => {
    scheduleSampler = await createScheduleSampler({
        baseUrl: '',
        urls: {
            C4: (await import('./resources/C4.mp3')).default,
        },
    });
    console.log('schedule sampler created!');
};

id('b9').onclick = () => {
    if (midiJSON && scheduleSampler) {
        const tracks = midiJSON.tracks.filter(
            (track) => track.notes.length > 0
        );
        tracks.map((track) => scheduleSampler.scheduleNote(track.notes));
        console.log('scheduled note', tracks);
    }
};

id('b10').onclick = () => {
    if (midiJSON) {
        const track = midiJSON.tracks.find(
            (track) => track.notes.length > 0 && track.instrument.number === 0
        );
        if (!track) return;
        const pianoNoteNameEle = id('b10-1');
        const handler = (note: NoteCreaterJSON) => {
            pianoNoteNameEle.innerText = String(note.name);
        };
        scheduleDrawOfNote(handler, track.notes);
        console.log('scheduled draw of note', track.notes);
    }
};

id('b11').onclick = () => {
    const timeEle = id('b10-2');
    scheduleDrawAtTime(
        (time) => {
            timeEle.innerText = String(time);
        },
        [0, 5, 10]
    );
    console.log('scheduled draw at time');
};

id('b12').onclick = () => {
    cancelScheduled();
};

id('b13').onclick = () => {
    start();
};

id('b14').onclick = () => {
    pause();
};

id('b15').onclick = () => {
    stop();
};

const trackCreaterJSONs: TrackCreaterJSON[] = [
    {
        channel: 0,
        instrumentNumber: 0,
        notes: [
            { name: 'c5', time: 0, duration: 1, velocity: 1 },
            { name: 'a4', time: 2, duration: 1, velocity: 1 },
        ],
    },
    {
        channel: 1,
        instrumentNumber: 0,
        notes: [
            { name: 'b4', time: 1, duration: 1, velocity: 1 },
            { name: 'g4', time: 3, duration: 2, velocity: 1 },
        ],
    },
];
let newMidiJSON: MidiJSON;
id('b16').onclick = () => {
    newMidiJSON = createMidiJSON(trackCreaterJSONs);
    console.log(trackCreaterJSONs)
    console.log(newMidiJSON);
};

const appendTrackCreaterJSONs: TrackCreaterJSON[] = [
    {
        channel: 2,
        instrumentNumber: 34,
        notes: [
            { name: 'A6', time: 3, duration: 1, velocity: 1 },
            { name: 'C6', time: 3, duration: 2, velocity: 1 },
        ],
    },
];
let appendedMidiJSON: MidiJSON;
id('b17').onclick = () => {
    appendedMidiJSON = appendNotesToMidiJSON(
        newMidiJSON,
        appendTrackCreaterJSONs
    );
    console.log(appendedMidiJSON);
};
