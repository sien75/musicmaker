// basic imports
import React, { useEffect, useState } from 'react';
// base components
import { Loading } from '../_base_components';
// same directory component
import Layout from './layout';
import { loadControllerComponent, loadControllerPosition, loadMmComponents, loadMmValue, } from './handle_components';
const container = ({ tone, midi, mmAppearances, controllerAppearance, }) => {
    const [mmComponents, setMmComponents] = useState();
    const [mmValues, setMmValuesArray] = useState();
    const [Controller, setController] = useState();
    const [controllerPosition, setControllerPosition] = useState();
    const [scheduled, setScheduled] = useState({
        should: false,
        total: 0,
        current: 0,
    });
    // load MusicMaker components
    useEffect(() => {
        loadMmComponents({ mmAppearances, mmComponents, setMmComponents });
    }, [mmAppearances]);
    // load props passed to the MusicMaker components and the related Layout components
    useEffect(() => {
        loadMmValue({ mmAppearances, midi, tone, setMmValuesArray });
    }, [mmAppearances, midi]);
    // load Controller component
    useEffect(() => {
        loadControllerComponent({ controllerAppearance, setController });
    }, [controllerAppearance]);
    // load props passed to the Layout component related to the Controller component
    useEffect(() => {
        loadControllerPosition({ controllerAppearance, setControllerPosition });
    }, [controllerAppearance]);
    // control the progress of scheduling midi
    const toSchedule = ({ should }) => {
        setScheduled({ ...scheduled, should, current: 0 });
    };
    const onScheduled = () => {
        setScheduled({ ...scheduled, current: scheduled.current + 1 });
    };
    useEffect(() => {
        setScheduled({
            ...scheduled,
            total: midi.tracks.filter(({ notes }) => notes.length).length,
        });
    }, [midi]);
    // show 'loading' when load components
    if (!mmComponents || !mmValues) {
        return React.createElement(Loading, null, "loading graphic part of MusicMaker components");
    }
    if (!Controller || !controllerPosition) {
        return React.createElement(Loading, null, "loading graphic part of Controller components");
    }
    if (scheduled.should) {
        if (scheduled.current != scheduled.total) {
            console.log('[MM] scheduling midi tracks...');
        }
        else {
            console.log('[MM] scheduled!');
        }
    }
    // hierarchy:
    //      container
    //          |- Layout
    //              |- MusicMaker Components or Controller Components
    // "container" controls the total position and size of the Muaicmaker
    // "Layout" controls the position and size of each components
    return (React.createElement("div", { className: "mm-container" },
        React.createElement(Layout, { position: controllerPosition },
            React.createElement(Controller, { tone: tone, scheduled: scheduled, onToSchedule: toSchedule })),
        mmValues.map(({ name, track, position }, index) => {
            const MmComponent = mmComponents[name] ?? mmComponents.show_null;
            if (!MmComponent) {
                return (React.createElement(Loading, { key: index }, "preparing MusicMaker components"));
            }
            return (React.createElement(Layout, { position: position, key: index },
                React.createElement(MmComponent, { tone: tone, track: track, scheduled: scheduled, onScheduled: onScheduled })));
        })));
};
export default container;
