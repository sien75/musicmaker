import React, { useEffect, memo } from 'react';

import { ControllerProps } from '../_types';

const normalController = ({
    tone,
    scheduled,
    scheduled: { total, current },
    setScheduled,
}: ControllerProps): JSX.Element => {
    useEffect(() => {
        if (current !== 0 && current === total) {
            tone.start();
        }
    }, [current]);

    return (
        <div className="normal-controller">
            <button
                onClick={() => {
                    const _ = async () => {
                        await tone.audioStart();
                        if (total === current) {
                            tone.start();
                        } else {
                            tone.sync();
                            setScheduled({
                                ...scheduled,
                                should: true,
                            });
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
