// the 'start' is provided by Tonejs library
// it starts the audio context on a click or keypress event handler

import { forEach } from 'lodash/fp';

import { Sampler } from 'tone';

export const sync = (samplers: Sampler[]) => {
    forEach((sampler) => sampler.sync(), samplers);
};

export const unSync = (samplers: Sampler[]) => {
    forEach((sampler) => sampler.unsync(), samplers);
};
