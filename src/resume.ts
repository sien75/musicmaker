// context will be 'suspended' state if it is created before user gesture
// you should resume it before audio starting
// see: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume

import { Transport } from 'tone';

const context = Transport.context;

export const resume = async () => {
    await context.resume();
};

export const getContextState = () => {
    return context.state;
};
