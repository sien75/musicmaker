# MusicMaker.js

[![npm version](https://img.shields.io/badge/npm-3.0.0-brightgreen)](https://www.npmjs.com/package/musicmaker)
[![license](https://img.shields.io/badge/LICENSE-Apache--2.0-brightgreen)](https://github.com/sien75/musicmaker/blob/master/LICENSE)

[中文](https://github.com/sien75/musicmaker/blob/master/README_zh.md)

`MusicMaker.js`, also called `MusicMaker-Core` or `MusicMaker`, is a JavaScript audio library capable of making interactive Midi audio web applications. Currently, it is implemented as a functional wrapper for a few features of the `Tonejs/Tone.js` and `Tonejs/Midi` libraries.

Intuitively, this library can do:
* A web-based piano that responds to keyboard events
* Vittual band
* arranger
* etc.

Basic functions:
* Trigger note of specified instrument
* Schedule and play note sequences
* Make MidiJSON(JSON format of midi file)

## Related libraries

### Thanks

* [Tonejs/Tone.js](https://github.com/Tonejs/Tone.js)
* [Tonejs/Midi](https://github.com/Tonejs/Midi)

## Installation

### Installation method

> When installing through yarn and npm, and building through tools such as Webpack, please refer to the following [Installation Precautions](#installation-precautions) and import `MusicMaker.js` as an external resource.

yarn

```shell
yarn add musicmaker
```

npm

```shell
npm i musicmaker
```

script tag, and the global variable is `MusicMaker`

```html
<script src="https://unpkg.com/musicmaker@3"></script>
```

### Installation Precautions

The first thing to note is that when you install `MusicMaker.js` through yarn or npm, and build through tools such as Webpack, **build time may be long**.

In this case, it is recommended to import it as an external resource through script tag at the same time. Since the build result of the dependent `Tonejs/Tone.js` is very large, this method can avoid the repeated construction of `Tonejs/Tone.js`.

For example, if built through Webpack, you can make `MusicMaker.js` as `externals`:

```js
module.exports = {
    mode: ...,
    entry: ...,
    externals: {
        musicmaker: 'MusicMaker',
    },
}
```

At the same time, import it through script tag in the html template file:

```html
<script src="https://unpkg.com/musicmaker@3"></script>
```

The second thing to note is that because `MusicMaker.js` depends on `Ramda`, you can use `musicmaker.lite.js` if you want to use `Ramda` at the same time, as this build result removes `Ramda` and it should be imported yourself:

```html
<script src="https://unpkg.com/ramda@0.28.0/dist/ramda.min.js"></script>
<script src="https://unpkg.com/musicmaker@3/lib/umd/musicmaker.lite.js"></script>
```

`musicmaker.pure.js` removes all dependencies, so you should import all dependencies yourself:

```html
<script src="https://unpkg.com/ramda@0.28.0/dist/ramda.min.js"></script>
<script src="https://unpkg.com/tone@14.7.77/build/Tone.js"></script>
<script src="https://unpkg.com/@tonejs/midi@2.0.28/build/Midi.js"></script>
<script src="https://unpkg.com/musicmaker@3/lib/umd/musicmaker.pure.js"></script>
```

## Basic usage

### Resume context

Browser will not play audio before user events. So, before actually playing audio, you should resume cotext firstly calling the resume context function on a user event (usually a click event).

```ts
import { resume } from 'musicmaker';

button.onclick = async () => {
    await resume();
    console.log('context resumed');
}
```

> About browser's autoplay policy, refer to <https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide>.

Refer to the Resume part in [API](#API) for details.

### Function 1: Trigger note of specified instrument

This function is suitable for real-time playing (such as web-based piano) scenarios.

```ts
import { createTriggerSampler, TriggerSampler } from 'musicmaker';

let triggerSampler: TriggerSampler;

button1.onclick = async () => {
    triggerSampler = await createTriggerSampler({
        baseUrl: 'https://xxx/',
        urls: {
            C4: 'C4.mp3',
            D4: 'D4.mp3',
            E4: 'E4.mp3',
        },
    });
    console.log('trigger sampler created!');
};

button2.onclick = () => {
    if (!triggerSampler) return;
    triggerSampler.triggerAttackRelease('C5', 1);
};
```

`createTriggerSampler` can create sampler for "trigger note of specified instrument". Suppose that there are 3 instrument sound source files at `https://xxx/C4.mp3`, `https://xxx/D4.mp3` and `https://xxx/E4.mp3`, and then the click event on button1 creates a sampler for this instrument.

Click event on button2 means: trigger 'C5' note of this instrument immediately for 1 second.

>Pass in some note source files at creation time, the `Sampler` can emulate other notes of this instrument (C1~B7). Less note passed in means less loading time, and more notes means that the sound from sampler is more accurate.

Refer to the Trigger part in [API](#API) for details.

### Function 2: Schedule and play note sequences

This function is suitable for music show (such as virtual band) scenarios.

```ts
import { createScheduleSampler, ScheduleSampler, start, stop } from 'musicmaker';

let scheduleSampler: ScheduleSampler;
button1.onclick = async () => {
    scheduleSampler = await createScheduleSampler({
        baseUrl: 'https://xxx/',
        urls: {
            C4: 'C4.mp3',
            D4: 'D4.mp3',
            E4: 'E4.mp3',
        },
    });
    console.log('schedule sampler created!');
};

button2.onclick = () => {
    if (!scheduleSampler) return;
    scheduleSampler.scheduleNote([
        { name: 'C4', time: 0, duration: 1, velocity: 1 },
        { name: 'E4', time: 1, duration: 1, velocity: 1 },
        { name: 'G4', time: 2, duration: 1, velocity: 1 },
    ]);
    console.log('scheduled notes');
};

button3.onclick = () => {
    start();
}

button4.onclick = () => {
    stop();
}
```

`createScheduleSampler` can create sampler for "schedule and play note sequences".

After the sampler is created, the `scheduleNote` method under it can be called. This method accepts parameters in `NoteCreaterJSON[]` format (refer to Types part in [API](#API) for details). The note sequence above means:

* play C4 note at time 0, for 1 second, with a volume of 1
* play E4 note at time 1, for 1 second, with a volume of 1
* play G4 note at time 2, for 1 second, with a volume of 1

The time starts when the `start` method is called, and ends when the `stop` method is called. The volume value is 0~1.

After the note sequence is scheduled, click button3 to play.

Refer to Schedule part in [API](#API) for details.

### Function 3: make MidiJSON

This function is suitable for arranger scenarios.

```ts
import { createMidiJSON, TrackCreaterJSON } from 'musicmaker';

const trackCreaterJSONs: TrackCreaterJSON[] = [
    {
        channel: 0,
        instrumentNumber: 0,
        notes: [
            { name: 'C5', time: 0, duration: 1, velocity: 1 },
            { name: 'A4', time: 2, duration: 1, velocity: 1 },
        ],
    },
    {
        channel: 1,
        instrumentNumber: 0,
        notes: [
            { name: 'B4', time: 1, duration: 1, velocity: 1 },
            { name: 'G4', time: 3, duration: 2, velocity: 1 },
        ],
    },
];
const newMidiJSON = createMidiJSON(trackCreaterJSONs);
console.log(newMidiJSON);
console.log('new MidiJSON created');
```

`MidiJSON`is the JSON format of midi file, and it can be converted from midi file by conversion functions.

`TrackCreaterJSON` is a format for describing the content of a track when creating `MidiJSON`.

Use function `createMidiJSON` to create MidiJSON, which accepts parameters in `TrackCreaterJSON[]` format, and returns variables in `MidiJSON` format.

Refer to makeMidiJSON part in [API](#API) for details.

## API

### Types

#### Timbre

```
type :: { urls: Urls; baseUrl?: string }
```

Specify the address of the instrument sound source file. For Example:

```ts
{
    urls: {
        C4: 'C4.mp3',
        C5: 'C5.mp3',
    },
    baseUrl: 'https://xxx.com/',
}
```

If the audio files are under the `/mp3_sources` folder of the same origin server:

```ts
{
    urls: {
        C4: '/mp3_sources/C4.mp3',
        C5: '/mp3_sources/C5.mp3',
    }
}
```

#### Urls

```
type :: { [note: string]: string }
```

Used in conjunction with the [Timbre](#timbre) type to specify the address of the instrument sound source file.

#### TriggerSampler

```
type :: {
    triggerAttack: function;
    triggerRelease: function;
    triggerAttackRelease: function;
}
```

triggerAttack
```
function :: (name: string, time?: number, velocity?: number) => void
```

triggerRelease
```
function :: (name: string, time?: number) => void
```

triggerAttackRelease
```
function :: (name: string, duration: number, time?: number, velocity?: number) => void
```

Sampler for "Trigger note of specified instrument". There are 3 functions under the sampler:
* `triggerAttack`, The note starts playing when this function is called
* `triggerRelease`, The note stops playing when this function is called
* `triggerAttackRelease`, The note starts amd stops playing when this function is called

Among them, the meaning of each props can be seen in [NoteCreaterJSON](#notecreaterjson) properties with the same name.

#### ScheduleSampler

```
type :: { scheduleNote }
```

scheduleNote
```
function :: (notes: NoteCreaterJSON[]) => void 
```

Sampler for "Schedule and play note sequences". There is 1 function under the sampler:
* `scheduleNote`, schedule specified notes, and these notes will start playing when the [start](#start) function is called

#### NoteCreaterJSON

```
type :: {
    name: string;
    time: number;
    duration: number;
    velocity: number;
}
```

Note format when creating [MidiJSON](#midijson). The meanings of the specific fields are as follows:
* `name`, name of note, 如`C4`
* `time`, the time when note starting playing
* `duration`, duration of note playing
* `velocity`, meaning the volume of note, and value is 0~1

#### TrackCreaterJSON

```
type :: {
    channel: number;
    instrumentNumber: number;
    notes: NoteCreaterJSON[];
}
```

Track format when creating [MidiJSON](#midijson). An audio track contains multiple notes, and a midi track can contain multiple audio tracks.

The meaning of each field:
* `channel`, audio channel, the identifier of the audio track
* `instrumentNumber`, the instrument midi number for this audio track
* `notes`, the notes this audio track contains

#### NoteJSON

```
type :: {
    time: number;
    midi: number;
    name: string;
    velocity: number;
    duration: number;
    ticks: number;
    durationTicks: number;
}
```

Note format of [MidiJSON](#midijson) in Tonejs/Midi, which has several more fields than [NoteCreaterJSON](#notecreaterjson).

In the usage of this library, you don't need to know its specific field content, you only need to know that NoteJSON is an extended version of NoteCreaterJSON, and NoteJSON can be used wherever NoteCreaterJSON is used.

#### TrackJSON

```
type :: {
    name: string;
    notes: NoteJSON[];
    channel: number;
    instrument: InstrumentJSON;
    // *omit*
}
```

InstrumentJSON
```
{
    family: string;
    number: number;
    name: string;
}
```

The audio track format of [MidiJSON](#midijson) in Tonejs/Midi, where `instrument.number` is the instrument midi number of the audio track.

#### MidiJSON

```
type MidiJSON {
    tracks: TrackJSON[];
    // *omit*
}
```

The "famous" MidiJSON, the JSON format of midi files, is provided by Tonejs/Midi.

In MidiJSON, audio tracks are included, and each audio track contains instrument information and pitch information.

### Resume

#### resume

```
function :: () => Promise<void>
```

Resume the current context, which means convert the current context from `suspended` to `running`. Audio can only be played when the context state is `running`.

#### getContextState

```
function :: () => AudioContextState
```

Get the state of the current context, possible values are `running`, `suspended` and `closed`.

### Trigger

#### createTriggerSampler

```
function :: (timbre: Timbre) => Promise<TriggerSampler>
```

Create a sampler for "Trigger note of specified instrument". For details of the functions under the sampler, see the [TriggerSampler](#triggersampler) part.

### Schedule

#### createScheduleSampler

```
function :: (timbre: Timbre) => Promise<ScheduleSampler>
```

Create a sampler for "Schedule and play note sequences". For details of each function under the sampler, see the [ScheduleSampler](#schedulesampler) part.

#### scheduleDrawOfNote

```
curried function :: (NoteCreaterJSON -> any) -> NoteCreaterJSON[] -> void
```

Schedule draw events according to the given notes.

If you need to implement a web-based piano that can automatically play tracks, you need to schedule two things:
* Schedule audio, through [createScheduleSampler](#createschedulesampler)
* Schedule and draw events, that is, when a certain note on the piano is played, the corresponding key position is grayed out, to show the effect of "pressing"

The first parameter the function accepts is the function that handles the drawing:

```ts
const logNoteWhenPlaying = scheduleDrawOfNote(console.log);
logNoteWhenPlaying(noteCreaterJSONs);
start();
```

#### scheduleDrawAtTime

```
curried function :: (number -> any) -> number -> void
```

Schedule draw events by time.

If you need to make the background color of the web page darker when a certain piece of music starts playing to improve immersion, then you need this function:

```ts
const changeBackgroungAtTime = scheduleDrawAtTime(changeBackground);
changeBackgroungAtTime(0);
start();
```

#### cancelScheduled

```
function :: () => void
```

Cancel all scheduled events, includeing audio events and draw events.

#### start

```
function :: () => void
```

Start playing the scheduled audio events, and start rendering the scheduled draw events synchronously.

#### pause

```
function :: () => void
```

Pause playing the scheduled audio events, and pause rendering the scheduled draw events synchronously.

#### stop

```
function :: () => void
```

Stop playing the scheduled audio events, and stop rendering the scheduled draw events synchronously.

### MakeMidiJSON

#### createMidiJSON

```
curried function :: TrackCreaterJSON[] -> MidiJSON
```

Make a new [MidiJSON](#midijson) from scratch.

#### appendNotesToMidiJSON

```
curried function :: MidiJSON -> TrackCreaterJSON -> MidiJSON
```

Add new tracks to an existing [MidiJSON](#midijson), returning the new MidiJSON.

### Convert

#### convertToMidiJSONFromArrayBuffer

```
function :: (arrayBuffer: ArrayBuffer) => MidiJSON
```

Convert from ArrayBuffer read from files to [MidiJSON](#midijson).

#### convertToUint8ArrayFromMidiJSON

```
function :: (midiJSON: MidiJSON) => Uint8Array
```

Convert from [MidiJSON](#midijson) to Uint8Array, in order to storage as file.

#### convertToMidiJSONFromUrl

```
function :: (url: string) => Promise<MidiJSON>
```

Convert the midi file referred to by the url to [MidiJSON](#midijson).
