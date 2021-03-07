// basic imports
import React, { useEffect, useState } from 'react';
import { Midi } from '@tonejs/midi';
// tone part
import Tone from './_tone';
// base components
import { Loading } from './_base_components';
// container
import Container from './_container';
// export MusicMaker
const MusicMaker = ({ mmSource, timbres, controllerAppearance, }) => {
    const [tone] = useState(new Tone());
    const [midi, setMidi] = useState();
    const [mmAppearances, setMmAppearances] = useState();
    const [timbrePrepared, setTimbrePrepared] = useState(false);
    // set midi score and appearances under different types
    useEffect(() => {
        const setMidiAndPosition = async () => {
            switch (mmSource.type) {
                case 'midi': {
                    const { url } = mmSource;
                    if (!url) {
                        throw new Error('mmSource type "midi" must have key "url"');
                    }
                    setMidi(await Midi.fromUrl(url));
                    setMmAppearances([]);
                    break;
                }
                case 'json': {
                    const { url } = mmSource;
                    if (!url) {
                        throw new Error('mmSource type "json" must have key "url"');
                    }
                    const { midi, appearances } = await (await fetch(url)).json();
                    if (!midi || !appearances) {
                        throw new Error('mmSource type "json" invalid content format');
                    }
                    setMidi(midi);
                    setMmAppearances(appearances);
                    break;
                }
                case 'object': {
                    const { midi, mmAppearances } = mmSource;
                    if (!midi || !mmAppearances) {
                        throw new Error('mmSource type "object" must have key "midi" and "mmAppearances"');
                    }
                    setMidi(midi);
                    setMmAppearances(mmAppearances);
                    break;
                }
                default: {
                    setMidi(new Midi());
                    setMmAppearances([]);
                }
            }
        };
        setMidiAndPosition();
    }, [mmSource]);
    // load the timbre source
    useEffect(() => {
        try {
            setTimbrePrepared(false);
            timbres.forEach((timbre) => {
                tone.addTimbre(timbre);
            });
        }
        finally {
            setTimbrePrepared(true);
        }
    }, [timbres]);
    // tell click event to execute "Tone.start()" firstly
    useEffect(() => {
        window._musicmaker_init = false;
    }, []);
    // return Loading component when loading
    if (!midi || !mmAppearances) {
        return React.createElement(Loading, null, "loading midi source");
    }
    if (!timbrePrepared) {
        return React.createElement(Loading, null, "loading timbre source");
    }
    // return a container to arrange the layout
    return (React.createElement(Container, { tone: tone, midi: midi, mmAppearances: mmAppearances, controllerAppearance: controllerAppearance }));
};
export default MusicMaker;
