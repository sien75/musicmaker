import { nullPosition } from '../_constants';
import controllerFunction from '../_controllers';
export function loadMmComponents({ mmAppearances, mmComponents, setMmComponents, }) {
    const loadMmComponents = async () => {
        const _mmCom = mmComponents ?? {};
        // load the default show compoment
        if (!mmComponents || !mmComponents.show_simple) {
            const showNull = (await import('../show_null')).default;
            _mmCom.show_null = showNull;
        }
        for (const { name } of mmAppearances) {
            if (!mmComponents || !mmComponents[name]) {
                try {
                    const newComponents = (await import(`../${name}`)).default;
                    _mmCom[name] = newComponents;
                }
                catch (e) {
                    // ensure that error does not break the for loop
                    console.error(e);
                }
            }
        }
        setMmComponents(_mmCom);
    };
    loadMmComponents();
}
export function loadMmValue({ mmAppearances, midi, setMmValuesArray, }) {
    const _mmValues = midi.tracks
        .filter(({ notes }) => notes.length)
        .map((track) => {
        const { channel } = track;
        let appearance = mmAppearances.filter(({ channel: _channel }) => _channel === channel)[0];
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
export function loadControllerComponent({ controllerAppearance, setController, }) {
    const getController = async function ({ type }) {
        const _Controller = await controllerFunction(type);
        setController(() => _Controller);
    };
    if (controllerAppearance) {
        const { type } = controllerAppearance;
        getController({ type });
    }
    else {
        getController({ type: 'controller_normal' });
    }
}
export function loadControllerPosition({ controllerAppearance, setControllerPosition, }) {
    const _controllerPosition = controllerAppearance
        ? controllerAppearance.position
        : nullPosition;
    setControllerPosition(_controllerPosition);
}
