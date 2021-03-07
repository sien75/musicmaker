import { Midi } from '@tonejs/midi';
import Tone from '../_tone';
import { MmAppearance, Controller, MmComponents, MmValue, Position, ControllerAppearance } from '../_types';
export interface lmcProps {
    mmAppearances: MmAppearance[];
    mmComponents?: MmComponents;
    setMmComponents: (mmComponents: MmComponents) => void;
}
export declare function loadMmComponents({ mmAppearances, mmComponents, setMmComponents, }: lmcProps): void;
export interface lmcvProps {
    mmAppearances: MmAppearance[];
    midi: Midi;
    tone: Tone;
    setMmValuesArray: (mmValues: MmValue[]) => void;
}
export declare function loadMmValue({ mmAppearances, midi, setMmValuesArray, }: lmcvProps): void;
export interface lccProps {
    controllerAppearance?: ControllerAppearance;
    setController: (Controller: () => Controller) => void;
}
export declare function loadControllerComponent({ controllerAppearance, setController, }: lccProps): void;
export interface lcpProps {
    controllerAppearance?: ControllerAppearance;
    setControllerPosition: (position: Position) => void;
}
export declare function loadControllerPosition({ controllerAppearance, setControllerPosition, }: lcpProps): void;
