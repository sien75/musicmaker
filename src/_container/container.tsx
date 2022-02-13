// basic imports

import { Midi } from '@tonejs/midi';
import React, { useEffect, useState, memo } from 'react';

// constants

import {
    MmComponentAppearance,
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
    loadMmComponentValues,
    MmComponentValues,
    loadControllerComponentValue,
    ControllerComponentValue,
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
    const [
        mmComponentValues,
        setMmComponentValues,
    ] = useState<MmComponentValues>();
    const [
        controllerComponentValue,
        setControllerComponentValue,
    ] = useState<ControllerComponentValue>();
    const [loading, setLoading] = useState(false);
    const [scheduled, setScheduled] = useState<Scheduled>({
        should: false,
        total: 0,
        current: 0,
    });

    // load MusicMaker components and their related props: 'track' and 'position'

    useEffect(() => {
        loadMmComponentValues({
            mmComponentAppearances,
            midi,
            setMmComponentValues,
            setLoading,
        });
    }, [mmComponentAppearances, midi]);

    // load Controller component and its related props: 'position'

    useEffect(() => {
        loadControllerComponentValue({
            controllerAppearance,
            setControllerComponentValue,
            setLoading,
        });
    }, [controllerAppearance]);

    // control the progress of scheduling midi

    useEffect(() => {
        if (mmComponentValues) {
            setScheduled({
                ...scheduled,
                total: Object.keys(mmComponentValues).length,
            });
        }
    }, [mmComponentValues]);

    // show 'loading' when load components

    if (loading || !mmComponentValues || !controllerComponentValue) {
        return <Loading>loading MusicMaker or Controller components</Loading>;
    }

    if (scheduled.should && scheduled.current != scheduled.total) {
        console.log('[MM] scheduling midi tracks...');
    }

    // hierarchy:
    //      container
    //          |- Layout
    //              |- MusicMaker Components or Controller Components

    // "container" controls the total position and size of the Muaicmaker
    // "Layout" controls the position and size of each components

    const Controller = controllerComponentValue.component;

    return (
        <div className="mm-container">
            <Layout position={controllerComponentValue.position}>
                <Controller
                    tone={tone}
                    scheduled={scheduled}
                    setScheduled={setScheduled}
                />
            </Layout>
            {Object.keys(mmComponentValues).map((key) => {
                const {
                    component: MmComponent,
                    position,
                    track,
                } = mmComponentValues[key];

                return (
                    <Layout position={position} key={key}>
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

export default memo(container);
