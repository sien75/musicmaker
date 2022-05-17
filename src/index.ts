// // step1: make sure to resume audio context
export * from './resume';

// step2: create instruments for different timbres
// step3: sync instruments to transport
export * from './instrument';

// step4: 3 different scenes
// "play" scene:
// transport start firstly -> instrument plays single note
// "show" scene:
// convert to midi json -> schedule multi notes -> transport start
// "arrange" scene:
// schedule single note -> make midi json -> convert to arraybuffer

export * from './transport';

export * from './schedule';

export * from './convert';

export * from './draw';

export * from './makeMidiJSON';
