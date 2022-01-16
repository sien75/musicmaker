import { Midi, Track } from '@tonejs/midi';
import Tone from '../_tone';
import { Timbre } from '.';

import { Position, MmAppearance, ControllerAppearance } from './appearance';
import { Scheduled, ShouldObj } from './schedule';

// MusicMaker root component's props-format

export interface MMProps {
    mmSource: MmSource;
    timbres: Timbre[];
    controllerAppearance?: ControllerAppearance;
}

export interface MmSource {
    type: 'midi' | 'json' | 'object';
    url?: string;
    midi?: Midi;
    mmAppearances?: MmAppearance[];
}

// MusicMaker components, its names and its props-format

export type MmComponents = {
    [name in MmNames]?: (props: MmProps) => JSX.Element;
};

export type MmNames = 'show_simple' | 'show_null' | 'show_custom';

export interface MmProps {
    tone: Tone;
    track: Track;
    scheduled: Scheduled;
    onScheduled: () => void;
}

export interface MmValue {
    name: MmNames;
    position: Position; // for wrapped Layout component
    track: Track; // for Musicmaker component
}

// Cotroller components, its types and its props-format

export type Controller = (props: ControllerProps) => JSX.Element;

export type ControllerTypes = 'controller_normal' | 'controller_custom';

export interface ControllerProps {
    tone: Tone;
    scheduled: Scheduled;
    onToSchedule: (shouldObj: ShouldObj) => void;
}
