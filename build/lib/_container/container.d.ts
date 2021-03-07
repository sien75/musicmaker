/// <reference types="react" />
import { Midi } from '@tonejs/midi';
import { MmAppearance, ControllerAppearance } from '../_types';
import Tone from 'src/_tone';
interface Props {
    tone: Tone;
    midi: Midi;
    mmAppearances: MmAppearance[];
    controllerAppearance?: ControllerAppearance;
}
declare const container: ({ tone, midi, mmAppearances, controllerAppearance, }: Props) => JSX.Element;
export default container;
