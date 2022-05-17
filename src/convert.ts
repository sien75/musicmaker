// functions to convert to or from Midi type object

// "Midi" is defined in @tonejs/midi library
// it describes the necessary midi infomation in JavaScript object format

import { compose } from 'ramda';

import { Midi } from '@tonejs/midi';

import { toJSON, toUint8Array, fromJSON, fromArrayBuffer } from './transferMidi';

export const convertToMidiJSONFromArrayBuffer = compose(
    toJSON,
    fromArrayBuffer
);

export const convertToUint8ArrayFromMidiJSON = compose(toUint8Array, fromJSON);

export const convertToMidiJSONFromUrl = async (url: string) =>
    toJSON(await Midi.fromUrl(url));
