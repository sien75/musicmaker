// create midi json from scratch or append notes to exsisting midi json

import { curry, forEach } from 'ramda';

import { Midi, MidiJSON } from '@tonejs/midi';

import { toJSON, fromJSON } from './inners/transferMidi';
import { MMTrackJSON } from './inners/jsonType';

export { MMTrackJSON };

const addTrack = curry((midi: Midi, trackJSON: MMTrackJSON) => {
    const track = midi.addTrack();
    track.channel = trackJSON.channel;
    track.instrument.number = trackJSON.instrument;
    forEach((note) => track.addNote(note), trackJSON.notes);
});

const makeNewMidiJSON = curry((midi: Midi, trackJSONs: MMTrackJSON[]) => {
    const addNotesToMidi = addTrack(midi);
    forEach(addNotesToMidi, trackJSONs);
    return toJSON(midi);
});

export const createMidiJSON = makeNewMidiJSON(new Midi());

export const appendNotesToMidiJSON = curry(
    (midiJSON: MidiJSON, trackJSONs: MMTrackJSON[]) => {
        const newMidiJSON = makeNewMidiJSON(fromJSON(midiJSON), trackJSONs);
        return newMidiJSON;
    }
);
