// the "Transport" is provided by Tonejs library
// it is a controller

import { Transport } from 'tone';

export const start = () => Transport.start();

export const pause = () => Transport.pause();

export const stop = () => Transport.stop();
