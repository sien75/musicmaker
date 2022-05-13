import { Midi, MidiJSON } from '@tonejs/midi';

export const toJSON = (midi: Midi) => midi.toJSON();

export const toUint8Array = (midi: Midi) => midi.toArray();

export const fromJSON = (midiJSON: MidiJSON) => {
    const midi = new Midi();
    midi.fromJSON(midiJSON);
    return midi;
};

export const fromArrayBuffer = (arrayBuffer: ArrayBuffer) => new Midi(arrayBuffer);
