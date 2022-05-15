// create midi json from scratch or append notes to exsisting midi json

import { curry, forEach } from 'ramda';

import { Midi, MidiJSON } from '@tonejs/midi';

import { toJSON, fromJSON } from './transferMidi';
import { NoteJSON } from './noteType';

const addNotes = curry((midi: Midi, notes: NoteJSON[]) => {
    const track = midi.addTrack();
    forEach(track.addNote, notes);
});

const makeNewMidiJSON = curry((midi: Midi, notess: NoteJSON[][]) => {
    const addNotesToMidi = addNotes(midi);
    forEach(addNotesToMidi, notess);
    return toJSON(midi);
});

export const createMidiJSON = makeNewMidiJSON(new Midi());

export const appendNotesToMidiJSON = curry(
    (midiJSON: MidiJSON, notess: NoteJSON[][]) =>
        makeNewMidiJSON(fromJSON(midiJSON), notess)
);
