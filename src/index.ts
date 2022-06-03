// step1: make sure to resume audio context
export * from './resume';

// step2: 3 different scenes

// "play" scene:
// step2a.1: create trigger type sampler
// step2a.2: trigger single note
export * from './trigger';

// "show" scene:
// step2b.1: (convert to midi json from url or arraybuffer)
// step2b.2: create schedule type sampler
// step2b.3: schedule notes and draw events
// step2b.4: start/pause/stop
export * from './schedule';

// "arrange" scene:
// step2c.1: (convert to midi json from url or arraybuffer)
// step2c.2: edit...
// step2c.3: make new midi json
// step2c.4: (convert to uint8array)
export * from './makeMidiJSON';

// convert functions
export * from './convert';

// json types
export * from './jsonType';
