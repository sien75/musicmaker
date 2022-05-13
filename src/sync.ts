// only synced samplers can be controlled by Transport

import { forEach } from 'lodash/fp';

import { Sampler } from 'tone';

export const sync = (samplers: Sampler[]) => {
    forEach((sampler) => sampler.sync(), samplers);
};

export const unSync = (samplers: Sampler[]) => {
    forEach((sampler) => sampler.unsync(), samplers);
};
