import React, { useEffect, memo } from 'react';

import { ControllerProps } from '../_types';

const normalController = ({
    tone,
    allReady,
    triggerStartSignal,
}: ControllerProps): JSX.Element => {
    useEffect(() => {
        if (allReady) {
            tone.start();
        }
    }, [allReady]);

    return (
        <div className="normal-controller">
            <button
                onClick={() => {
                    const _ = async () => {
                        await tone.audioStart();
                        if(allReady) tone.start();
                        else {
                            tone.sync();
                            triggerStartSignal();
                        }
                    };
                    _();
                }}
                className="normal-controller-start"
            >
                start
            </button>
            <button
                onClick={() => tone.pause()}
                className="normal-controller-pause"
            >
                pause
            </button>
            <button
                onClick={() => tone.stop()}
                className="normal-controller-stop"
            >
                stop
            </button>
        </div>
    );
};

export default memo(normalController);
