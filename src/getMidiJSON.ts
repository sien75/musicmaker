// create midi json from scratch or append notes to exsisting midi json

import { compose, curry, forEach } from 'lodash/fp';

import { Midi, MidiJSON, Track } from '@tonejs/midi';

import { toJSON, fromJSON } from './transferMidi';
import { NoteJSON } from './noteType';

const getTrackAndRelatedNotes = curry((midi: Midi, notes: NoteJSON[]) => ({
    track: midi.addTrack(),
    notes,
}));

const addNotesToTrack = ({
    track,
    notes,
}: {
    track: Track;
    notes: NoteJSON[];
}) => {
    forEach(track.addNote, notes);
};

const getNewMidiJSON = curry((midi: Midi, notess: NoteJSON[][]) => {
    forEach(compose(addNotesToTrack, getTrackAndRelatedNotes(midi)), notess);
    return toJSON(midi);
});

export const createMidiJSON = getNewMidiJSON(new Midi());

export const appendNotesToMidiJSON = curry(
    (midiJSON: MidiJSON, notess: NoteJSON[][]) =>
        getNewMidiJSON(fromJSON(midiJSON), notess)
);
