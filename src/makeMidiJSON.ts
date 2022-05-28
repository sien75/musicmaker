// create midi json from scratch or append notes to exsisting midi json

import { curry, forEach } from 'ramda';

import { Midi, MidiJSON } from '@tonejs/midi';

import { toJSON, fromJSON } from './inners/transferMidi';
import { TrackCreaterJSON } from './jsonType';

const addTrack = curry((midi: Midi, trackJSON: TrackCreaterJSON) => {
    const track = midi.addTrack();
    track.channel = trackJSON.channel;
    track.instrument.number = trackJSON.instrumentNumber;
    forEach((note) => track.addNote(note), trackJSON.notes);
});

const makeNewMidiJSON = curry((midi: Midi, tcJSONs: TrackCreaterJSON[]) => {
    const addTrackToMidi = addTrack(midi);
    forEach(addTrackToMidi, tcJSONs);
    return toJSON(midi);
});

export const createMidiJSON = (tcJSONs: TrackCreaterJSON[]) =>
    makeNewMidiJSON(new Midi(), tcJSONs);

export const appendNotesToMidiJSON = curry(
    (midiJSON: MidiJSON, tcJSONs: TrackCreaterJSON[]) => {
        const newMidiJSON = makeNewMidiJSON(fromJSON(midiJSON), tcJSONs);
        return newMidiJSON;
    }
);
