// provides the ability to schedule single or multiple note(s)

// the "Track" is a combination of multiple notes
// it defines a format of midi score

import { Transport } from 'tone';

export { start, pause, stop } from './inners/transport';

export { scheduleSingleNote, scheduleMultiNote } from './inners/scheduleNote';

export { scheduleSingleDraw, scheduleMultiDraw } from './inners/scheduleDraw';

export { scheduleSingle, scheduleMulti } from './inners/scheduleBoth';

export const cancelSchedule = (id: number) => {
    Transport.clear(id);
};
