import { Midi, Track } from '@tonejs/midi';
import Tone from '../_tone';
import {
    MmComponents,
    MmComponentName,
    MmComponentAppearance,
    Position,
    Controller,
    ControllerType,
} from '../_types';
import { nullPosition } from '../_constants';
import controllerFunction from '../_controllers';

export interface lmcProps {
    mmComponentAppearances: MmComponentAppearance[];
    mmComponents?: MmComponents;
    setMmComponents: (mmComponents: MmComponents) => void;
}

export function loadMmComponents({
    mmComponentAppearances,
    mmComponents,
    setMmComponents,
}: lmcProps): void {
    const loadMmComponents = async () => {
        const _mmCom: MmComponents = mmComponents ?? {};
        // load the default show compoment
        if (!_mmCom.show_null) {
            const showNull = (await import('../show_null')).default;
            _mmCom.show_null = showNull;
        }
        for (const { name } of mmComponentAppearances) {
            if (!_mmCom[name]) {
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

export interface MmComponentValue {
    name: MmComponentName;
    position: Position; // for wrapped Layout component
    track: Track; // for Musicmaker component
}

export interface lmcvProps {
    mmComponentAppearances: MmComponentAppearance[];
    midi: Midi;
    tone: Tone;
    setMmComponentValues: (mmValues: MmComponentValue[]) => void;
}

export function loadMmComponentValue({
    mmComponentAppearances,
    midi,
    setMmComponentValues,
}: lmcvProps): void {
    const _mmComVls: MmComponentValue[] = [];
    midi.tracks
        .filter(({ notes }) => notes.length)
        .forEach((track) => {
            const { channel } = track;
            mmComponentAppearances
                .filter(({ channel: _channel }) => _channel === channel)
                .forEach(({ name, position }) => {
                    _mmComVls.push({ name, track, position });
                });
        });
    setMmComponentValues(_mmComVls);
}

export interface lccProps {
    controllerType: ControllerType;
    setController: (controller: Controller) => void;
}

export function loadControllerComponent({
    controllerType,
    setController,
}: lccProps): void {
    const getAndSetController = async () => {
        const _Controller = await controllerFunction(controllerType);
        setController(_Controller);
    };
    getAndSetController();
}

export interface lcpProps {
    controllerPosition: Position;
    setControllerPosition: (position: Position) => void;
}

export function loadControllerPosition({
    controllerPosition,
    setControllerPosition,
}: lcpProps): void {
    const _controllerPosition = controllerPosition;
    setControllerPosition(_controllerPosition);
}
