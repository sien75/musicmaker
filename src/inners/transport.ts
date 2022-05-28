import { Transport } from 'tone';

export const start = () => {
    Transport.start();
};

export const pause = () => {
    Transport.pause();
};

export const stop = () => {
    Transport.stop();
};

export const cancelScheduled = () => {
    Transport.cancel();
};
