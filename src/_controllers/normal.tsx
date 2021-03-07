import React, { useEffect } from 'react';
import { start as ToneJSStart } from 'tone';

import { ControllerProps } from '../_types';

const normalController = ({
    tone,
    scheduled,
    scheduled: { should, current, total },
    onToSchedule,
}: ControllerProps): JSX.Element => {
    useEffect(() => {
        if (should && current === total) {
            onToSchedule({ should: false });
            tone.start();
        }
    }, [scheduled]);

    return (
        <div className="normal-controller">
            <button
                onClick={() => {
                    const _ = async () => {
                        if (!window._musicmaker_init) {
                            await ToneJSStart();
                            window._musicmaker_init = true;
                        }
                        if (tone.sync()) {
                            onToSchedule({ should: true });
                        } else {
                            tone.start();
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

export default normalController;
