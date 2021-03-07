/// <reference types="react" />
import { Midi, Track } from '@tonejs/midi';
import Tone, { Timbre } from '../_tone';
import { Position, MmAppearance, ControllerAppearance } from './appearance';
import { Scheduled, ShouldObj } from './schedule';
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
export declare type MmComponents = {
    [name in MmNames]?: (props: MmProps) => JSX.Element;
};
export declare type MmNames = 'show_simple' | 'show_null' | 'show_custom';
export interface MmProps {
    tone: Tone;
    track: Track;
    scheduled: Scheduled;
    onScheduled: () => void;
}
export interface MmValue {
    name: MmNames;
    position: Position;
    track: Track;
}
export declare type Controller = (props: ControllerProps) => JSX.Element;
export declare type ControllerTypes = 'controller_normal' | 'controller_custom';
export interface ControllerProps {
    tone: Tone;
    scheduled: Scheduled;
    onToSchedule: (shouldObj: ShouldObj) => void;
}
