// schedule drawing events

import { Draw, Transport } from 'tone';

export const draw = (time: number, handler: (t: number) => {}) => {
    return Transport.schedule((_time) => {
        Draw.schedule(() => handler(_time), _time);
        handler(_time);
    }, time);
};

export const cancelDraw = (id: number) => {
    Transport.clear(id);
};
