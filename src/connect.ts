// the 'start' is provided by Tonejs library
// it starts the audio context on a click or keypress event handler

import { Sampler, start } from 'tone';
import { Transport } from 'tone/build/esm/core/clock/Transport';

export const sync = (transport: Transport, ...samplers: Sampler[]) => {
    samplers.forEach((sampler) => sampler.sync());
};

export const unSync = (transport: Transport, ...samplers: Sampler[]) => {
    samplers.forEach((sampler) => sampler.unsync());
};

export const audioStart = () => start();