// step1: make sure to start audio context
export * from './toneStart';

// step2: create samplers for different timbres
export * from './sampler';

// step3: sync samplers to transport
export * from './sync';

// step4: 3 different scenes
// "play" scene:
// transport start firstly -> play single note
// "show" scene:
// convert to midi json -> schedule multi notes -> transport start
// "arrange" scene:
// schedule single note -> get midi json -> convert to arraybuffer

export * from './play';

export * from './schedule';

export * from './convert';

export * from './getMidiJSON';

export * from './transport';
