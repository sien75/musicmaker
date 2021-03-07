// basic imports

import { Midi } from '@tonejs/midi';
import React, { useEffect, useState } from 'react';

// constants

import {
    MmValue,
    MmComponents,
    MmAppearance,
    Controller,
    Position,
    Scheduled,
    ShouldObj,
    ControllerAppearance,
} from '../_types';

// base components

import { Loading } from '../_base_components';

// tone part

import Tone from 'src/_tone';

// same directory component

import Layout from './layout';
import {
    loadControllerComponent,
    loadControllerPosition,
    loadMmComponents,
    loadMmValue,
} from './handle_components';

interface Props {
    tone: Tone;
    midi: Midi;
    mmAppearances: MmAppearance[];
    controllerAppearance?: ControllerAppearance;
}

const container = ({
    tone,
    midi,
    mmAppearances,
    controllerAppearance,
}: Props): JSX.Element => {
    const [mmComponents, setMmComponents] = useState<MmComponents>();
    const [mmValues, setMmValuesArray] = useState<Array<MmValue>>();
    const [Controller, setController] = useState<Controller>();
    const [controllerPosition, setControllerPosition] = useState<Position>();
    const [scheduled, setScheduled] = useState<Scheduled>({
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

    const toSchedule = ({ should }: ShouldObj) => {
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
        return <Loading>loading graphic part of MusicMaker components</Loading>;
    }

    if (!Controller || !controllerPosition) {
        return <Loading>loading graphic part of Controller components</Loading>;
    }

    if (scheduled.should) {
        if (scheduled.current != scheduled.total) {
            console.log('[MM] scheduling midi tracks...');
        } else {
            console.log('[MM] scheduled!');
        }
    }
    // hierarchy:
    //      container
    //          |- Layout
    //              |- MusicMaker Components or Controller Components

    // "container" controls the total position and size of the Muaicmaker
    // "Layout" controls the position and size of each components

    return (
        <div className="mm-container">
            <Layout position={controllerPosition}>
                <Controller
                    tone={tone}
                    scheduled={scheduled}
                    onToSchedule={toSchedule}
                />
            </Layout>
            {mmValues.map(({ name, track, position }, index) => {
                const MmComponent =
                    mmComponents[name] ?? mmComponents.show_null;
                if (!MmComponent) {
                    return (
                        <Loading key={index}>
                            preparing MusicMaker components
                        </Loading>
                    );
                }

                return (
                    <Layout position={position} key={index}>
                        <MmComponent
                            tone={tone}
                            track={track}
                            scheduled={scheduled}
                            onScheduled={onScheduled}
                        />
                    </Layout>
                );
            })}
        </div>
    );
};

export default container;
