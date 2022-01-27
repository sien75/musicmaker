import { Tone } from './tone';
import { Scheduled } from './schedule';

// Cotroller components, its types and its props-format

export type Controller = (props: ControllerProps) => JSX.Element;

export type ControllerType = 'controller_normal' | 'controller_custom';

export interface ControllerProps {
    tone: Tone;
    scheduled: Scheduled;
    setScheduled: (scheduled: Scheduled) => void;
}
