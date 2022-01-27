// basic imports

import { Midi } from '@tonejs/midi';
import React, { useEffect, useState } from 'react';

// constants

import {
    MmComponents,
    MmComponentAppearance,
    Controller,
    Position,
    Scheduled,
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
    loadMmComponentValue,
    MmComponentValue,
} from './handle_components';

interface Props {
    tone: Tone;
    midi: Midi;
    mmComponentAppearances: MmComponentAppearance[];
    controllerAppearance: ControllerAppearance;
}

const container = ({
    tone,
    midi,
    mmComponentAppearances,
    controllerAppearance,
}: Props): JSX.Element => {
    const [mmComponents, setMmComponents] = useState<MmComponents>();
    const [mmComponentValues, setMmComponentValues] = useState<
        Array<MmComponentValue>
    >();
    const [Controller, setController] = useState<Controller>();
    const [controllerPosition, setControllerPosition] = useState<Position>();
    const [scheduled, setScheduled] = useState<Scheduled>({
        should: false,
        total: 0,
        current: 0,
    });

    // load MusicMaker components

    useEffect(() => {
        loadMmComponents({
            mmComponentAppearances,
            mmComponents,
            setMmComponents,
        });
    }, [mmComponentAppearances]);

    // load props passed to the MusicMaker components and the related Layout components

    useEffect(() => {
        loadMmComponentValue({
            mmComponentAppearances,
            midi,
            tone,
            setMmComponentValues,
        });
    }, [mmComponentAppearances, midi]);

    // load Controller component

    useEffect(() => {
        loadControllerComponent({
            controllerType: controllerAppearance.type,
            setController,
        });
    }, [controllerAppearance.type]);

    // load props passed to the Layout component related to the Controller component

    useEffect(() => {
        loadControllerPosition({
            controllerPosition: controllerAppearance.position,
            setControllerPosition,
        });
    }, [controllerAppearance.position]);

    // control the progress of scheduling midi

    useEffect(() => {
        setScheduled({
            ...scheduled,
            total: (mmComponentValues || []).length,
        });
    }, [mmComponentValues]);

    // show 'loading' when load components

    if (!mmComponents || !mmComponentValues) {
        return <Loading>loading MusicMaker components</Loading>;
    }

    if (!Controller || !controllerPosition) {
        return <Loading>loading Controller components</Loading>;
    }

    if (scheduled.current != scheduled.total) {
        console.log('[MM] scheduling midi tracks...');
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
                    setScheduled={setScheduled}
                />
            </Layout>
            {mmComponentValues.map(({ name, track, position }, index) => {
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
                            setScheduled={setScheduled}
                        />
                    </Layout>
                );
            })}
        </div>
    );
};

export default container;
