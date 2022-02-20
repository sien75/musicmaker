import { Midi } from '@tonejs/midi';

import { Timbre } from './tone';
import { Position } from './appearance';

import { MmComponentName } from './mm_component';
import { ControllerType } from './controller';

// MusicMaker root component's props-format

export interface MmProps {
    rules: Rules;
    timbres: Timbre[];
}

export type Rules = RulesMidiUrl | RulesJsonUrl | RulesObject;

interface RulesMidiUrl {
    type: 'midiUrl';
    url: string;
    mmComponentAppearances: MmComponentAppearance[];
    controllerAppearance: ControllerAppearance;
}

interface RulesJsonUrl {
    type: 'jsonUrl';
    url: string;
    controllerAppearance: ControllerAppearance;
}

interface RulesObject {
    type: 'object';
    midi: Midi;
    mmComponentAppearances: MmComponentAppearance[];
    controllerAppearance: ControllerAppearance;
}

export interface MmComponentAppearance {
    channel: number;
    position: Position;
    name: MmComponentName;
}

export interface ControllerAppearance {
    type: ControllerType;
    position: Position;
}
