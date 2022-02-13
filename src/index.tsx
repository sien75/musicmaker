// basic imports

import React, { useEffect, useState, memo } from 'react';
import { Midi } from '@tonejs/midi';

// types

import { MmProps, MmComponentAppearance } from './_types';

// tone part

import Tone from './_tone';

// base components

import { Loading } from './_base_components';

// container

import Container from './_container';

// export MusicMaker

const MusicMaker = ({ rules, timbres }: MmProps): JSX.Element => {
    const [tone] = useState<Tone>(new Tone());
    const [midi, setMidi] = useState<Midi>();
    const [mmComponentAppearances, setMmComponentAppearances] = useState<
        MmComponentAppearance[]
    >();
    const [timbrePrepared, setTimbrePrepared] = useState(false);

    // set midi score and appearances under different types

    useEffect(() => {
        const setMidiAndPosition = async () => {
            switch (rules.type) {
                case 'midiUrl': {
                    const { url } = rules;
                    setMidi(await Midi.fromUrl(url));
                    setMmComponentAppearances([]);
                    break;
                }

                case 'jsonUrl': {
                    const { url } = rules;
                    const { midi, appearances } = await (
                        await fetch(url)
                    ).json();
                    setMidi(midi as Midi);
                    setMmComponentAppearances(
                        appearances as MmComponentAppearance[]
                    );
                    break;
                }

                case 'object': {
                    const { midi, mmComponentAppearances } = rules;
                    setMidi(midi);
                    setMmComponentAppearances(mmComponentAppearances);
                    break;
                }

                default: {
                    setMidi(new Midi());
                    setMmComponentAppearances([]);
                }
            }
        };
        setMidiAndPosition();
    }, [rules]);

    // load the timbre source

    useEffect(() => {
        try {
            setTimbrePrepared(false);
            timbres.forEach((timbre) => {
                tone.addTimbre(timbre);
            });
        } finally {
            setTimbrePrepared(true);
        }
    }, [timbres]);

    // tell click event to execute "Tone.start()" firstly

    useEffect(() => {
        window._musicmaker_init = false;
    }, []);

    // return Loading component when loading

    if (!midi || !mmComponentAppearances) {
        return <Loading>loading rule source</Loading>;
    }

    if (!timbrePrepared) {
        return <Loading>loading timbre source</Loading>;
    }

    // return a container to arrange the layout

    return (
        <Container
            tone={tone}
            midi={midi}
            mmComponentAppearances={mmComponentAppearances}
            controllerAppearance={rules.controllerAppearance}
        />
    );
};

export default memo(MusicMaker);
