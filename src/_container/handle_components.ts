import { Midi } from '@tonejs/midi';
import Tone from '../_tone';
import {
    MmAppearance,
    Controller,
    MmComponents,
    MmValue,
    Position,
    ControllerAppearance,
    ControllerTypes,
} from '../_types';
import { nullPosition } from '../_constants';
import controllerFunction from '../_controllers';

export interface lmcProps {
    mmAppearances: MmAppearance[];
    mmComponents?: MmComponents;
    setMmComponents: (mmComponents: MmComponents) => void;
}

export function loadMmComponents({
    mmAppearances,
    mmComponents,
    setMmComponents,
}: lmcProps): void {
    const loadMmComponents = async () => {
        const _mmCom: MmComponents = mmComponents ?? {};
        // load the default show compoment
        if (!mmComponents || !mmComponents.show_null) {
            const showNull = (await import('../show_null')).default;
            _mmCom.show_null = showNull;
        }
        for (const { name } of mmAppearances) {
            if (!mmComponents || !mmComponents[name]) {
                try {
                    const newComponents = (await import(`../${name}`)).default;
                    _mmCom[name] = newComponents;
                } catch (e) {
                    // ensure that error does not break the for loop
                    console.error(e);
                }
            }
        }
        setMmComponents(_mmCom);
    };
    loadMmComponents();
}

export interface lmcvProps {
    mmAppearances: MmAppearance[];
    midi: Midi;
    tone: Tone;
    setMmValuesArray: (mmValues: MmValue[]) => void;
}

export function loadMmValue({
    mmAppearances,
    midi,
    setMmValuesArray,
}: lmcvProps): void {
    const _mmValues = midi.tracks
        .filter(({ notes }) => notes.length)
        .map((track) => {
            const { channel } = track;
            let appearance = mmAppearances.filter(
                ({ channel: _channel }) => _channel === channel
            )[0];
            if (!appearance) {
                appearance = {
                    name: 'show_null',
                    channel,
                    position: nullPosition,
                };
            }
            return {
                name: appearance.name,
                track,
                position: appearance.position,
            };
        });
    setMmValuesArray(_mmValues);
}

export interface lccProps {
    controllerAppearance?: ControllerAppearance;
    setController: (Controller: () => Controller) => void;
}

interface TypeObj {
    type: ControllerTypes;
}

export function loadControllerComponent({
    controllerAppearance,
    setController,
}: lccProps): void {
    const getController = async function ({ type }: TypeObj) {
        const _Controller = await controllerFunction(type);
        setController(() => _Controller);
    };
    if (controllerAppearance) {
        const { type } = controllerAppearance;
        getController({ type });
    } else {
        getController({ type: 'controller_normal' });
    }
}

export interface lcpProps {
    controllerAppearance?: ControllerAppearance;
    setControllerPosition: (position: Position) => void;
}

export function loadControllerPosition({
    controllerAppearance,
    setControllerPosition,
}: lcpProps): void {
    const _controllerPosition = controllerAppearance
        ? controllerAppearance.position
        : nullPosition;
    setControllerPosition(_controllerPosition);
}
