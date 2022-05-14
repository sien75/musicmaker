// the "Transport" is provided by Tonejs library
// think of it as a controller to start, pause and stop playing audio

import { Transport } from 'tone';

export const start = () => Transport.start();

export const pause = () => Transport.pause();

export const stop = () => Transport.stop();
