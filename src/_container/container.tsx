// basic imports

import { Midi } from '@tonejs/midi';
import React, { useEffect, useState, memo, useMemo, useCallback } from 'react';

// constants

import { MmComponentAppearance, ControllerAppearance } from '../_types';

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
    const [loading, setLoading] = useState(false);

    // load MusicMaker components and their related props: 'track' and 'position'

    const [
        mmComponentValues,
        setMmComponentValues,
    ] = useState<MmComponentValues>();

    useEffect(() => {
        loadMmComponentValues({
            mmComponentAppearances,
            midi,
            setMmComponentValues,
            setLoading,
        });
    }, [mmComponentAppearances, midi]);

    // load Controller component and its related props: 'position'

    const [
        controllerComponentValue,
        setControllerComponentValue,
    ] = useState<ControllerComponentValue>();

    useEffect(() => {
        loadControllerComponentValue({
            controllerAppearance,
            setControllerComponentValue,
            setLoading,
        });
    }, [controllerAppearance]);

    // control the progress of scheduling midi

    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        setTotal(mmComponentValues ? Object.keys(mmComponentValues).length : 0);
        setCurrent(0);
    }, [mmComponentValues]);

    // when user click the "play" button in Controller Component,
    // Controller Component will trigger start signal,
    // to inform MusicMaker Components scheduling midi if needed
    const triggerStartSignal = useCallback(() => {
        setShould(true);
    }, []);

    // "should" for MusicMaker Components, inform them to schedule midi if needed
    const [should, setShould] = useState(false);

    // MusicMaker Components will call this method once they are ready
    const updateCurrent = useCallback((ready) => {
        setCurrent((c) => c + 1);
        console.log(`[MM]: scheduled one ${ready ? 'success' : 'failed'}`);
    }, []);

    // "allReady" inform Controller Component that it's time to actually play,
    // reset "current" and "should" meanwhile
    const allReady = useMemo(() => {
        if (current === total && current !== 0) {
            setShould(false);
            console.log('[MM]: all scheduled!');
            return true;
        }
        return false;
    }, [current, total]);

    // show 'loading' when load components

    if (loading || !mmComponentValues || !controllerComponentValue) {
        return <Loading>loading MusicMaker or Controller components</Loading>;
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
                    allReady={allReady}
                    triggerStartSignal={triggerStartSignal}
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
                            should={should}
                            updateCurrent={updateCurrent}
                        />
                    </Layout>
                );
            })}
        </div>
    );
};

export default memo(container);
