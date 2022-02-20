import { Tone } from './tone';

// Cotroller components, its types and its props-format

export type Controller = (props: ControllerProps) => JSX.Element;

export type ControllerType = 'controller_normal' | 'controller_custom';

export interface ControllerProps {
    tone: Tone;
    allReady: boolean;
    triggerStartSignal: () => void;
}
