import { Track } from '@tonejs/midi';

import { Tone } from './tone';
import { Scheduled } from './schedule';

// MusicMaker components, its names and its props-format

export type MmComponent = (props: MmComponentProps) => JSX.Element;

export type MmComponents = {
    [name in MmComponentName]?: MmComponent;
};

export type MmComponentName = 'show_simple' | 'show_null' | 'show_custom';

export interface MmComponentProps {
    tone: Tone;
    track: Track;
    scheduled: Scheduled;
    setScheduled: (scheduled: Scheduled) => void;
}
