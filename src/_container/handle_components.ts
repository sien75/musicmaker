import { Midi, Track } from '@tonejs/midi';
import {
    MmComponent,
    MmComponents,
    MmComponentAppearance,
    Position,
    Controller,
    ControllerType,
    ControllerAppearance,
} from '../_types';
import { nullPosition } from '../_constants';
import controllerFunction from '../_controllers';

export interface MmComponentValues {
    [key: string]: {
        component: MmComponent;
        position: Position; // for wrapped Layout component
        track: Track; // for Musicmaker component
    };
}

interface lmcvProps {
    mmComponentAppearances: MmComponentAppearance[];
    midi: Midi;
    setMmComponentValues: (mmValues: MmComponentValues) => void;
    setLoading: (loading: boolean) => void;
}

const loadedMmComponents: MmComponents = {};
const loadedMmValues: MmComponentValues = {};

export async function loadMmComponentValues({
    mmComponentAppearances,
    midi,
    setMmComponentValues,
    setLoading,
}: lmcvProps): Promise<void> {
    setLoading(true);
    let dirty = false;

    const tracks = midi.tracks.filter(({ notes }) => notes.length);
    for (const track of tracks) {
        const channel = track.channel;
        const channelStr = String(channel);
        let appearanceOfChannel = mmComponentAppearances.filter(
            ({ channel: _channel }) => _channel === channel
        )[0];
        if (!appearanceOfChannel) {
            appearanceOfChannel = {
                channel,
                position: nullPosition,
                name: 'show_null',
            };
        }
        const { name, position } = appearanceOfChannel;
        if (!loadedMmComponents[name])
            loadedMmComponents[name] = (await import(`../${name}`))?.default;
        const component = loadedMmComponents[name];
        if (!component) continue;
        if (
            component === loadedMmValues[channelStr]?.component &&
            position === loadedMmValues[channelStr]?.position &&
            track === loadedMmValues[channelStr]?.track
        )
            continue;
        dirty = true;
        loadedMmValues[channelStr] = { component, track, position };
    }
    if (dirty) {
        setMmComponentValues({ ...loadedMmValues });
    }
    setLoading(false);
}

export interface ControllerComponentValue {
    type: ControllerType;
    component: Controller;
    position: Position;
}

interface lccvProps {
    controllerAppearance: ControllerAppearance;
    setControllerComponentValue: (cValues: ControllerComponentValue) => void;
    setLoading: (loading: boolean) => void;
}

let loadedCmValue: ControllerComponentValue | null = null;

export async function loadControllerComponentValue({
    controllerAppearance: { type, position },
    setControllerComponentValue,
    setLoading,
}: lccvProps): Promise<void> {
    setLoading(true);
    const component =
        type === loadedCmValue?.type
            ? loadedCmValue.component
            : await controllerFunction(type);
    if (
        component !== loadedCmValue?.component ||
        position !== loadedCmValue?.position
    ) {
        loadedCmValue = { type, position, component };
        setControllerComponentValue({ ...loadedCmValue });
    }
    setLoading(false);
}
