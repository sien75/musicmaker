export * from './resume';

export * from './instrument';

export * from './transport';
export * from './schedule';
export * from './draw';

export * from './makeMidiJSON';

export * from './convert';

// step1: make sure to resume audio context

// step2: create instruments for different timbres

// step3: 3 different scenes

// "play" scene:
// instrument plays single note

// "show" scene:

// convert to midi json from url or arraybuffer ->
// sync instruments ->
// schedule multi notes and draw events ->
// start the scheduled

// "arrange" scene:

// convert to midi json from url or arraybuffer ->
// (edit...) ->
// make new midi json ->
// convert to uint8array
