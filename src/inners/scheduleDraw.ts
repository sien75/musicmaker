// schedule drawing events

import { map, curry } from 'ramda';

import { Draw, Transport } from 'tone';

export const scheduleSingleDraw = curry(
    (handler: (t: number) => any, time: number) => {
        return Transport.schedule((_time) => {
            Draw.schedule(() => handler(_time), _time);
            handler(_time);
        }, time);
    }
);

export const scheduleMultiDraw = (
    handler: (t: number) => any,
    times: number[]
) => {
    const scheduleSingleDrawOfHandler = scheduleSingleDraw(handler);
    return map(scheduleSingleDrawOfHandler, times);
};
