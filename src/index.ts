// // step1: make sure to resume audio context
export * from './resume';

// step2: create samplers for different timbres
export * from './sampler';

// step3: sync samplers to transport
export * from './sync';

// step4: 3 different scenes
// "play" scene:
// transport start firstly -> play single note
// "show" scene:
// convert to midi json -> schedule multi notes -> transport start and notify drawing
// "arrange" scene:
// schedule single note -> make midi json -> convert to arraybuffer

export * from './transport';

export * from './play';

export * from './schedule';

export * from './convert';

export * from './draw';

export * from './makeMidiJSON';
