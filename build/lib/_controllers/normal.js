import React, { useEffect } from 'react';
import { start as ToneJSStart } from 'tone';
const normalController = ({ tone, scheduled, scheduled: { should, current, total }, onToSchedule, }) => {
    useEffect(() => {
        if (should && current === total) {
            onToSchedule({ should: false });
            tone.start();
        }
    }, [scheduled]);
    return (React.createElement("div", { className: "normal-controller" },
        React.createElement("button", { onClick: () => {
                const _ = async () => {
                    if (!window._musicmaker_init) {
                        await ToneJSStart();
                        window._musicmaker_init = true;
                    }
                    if (tone.sync()) {
                        onToSchedule({ should: true });
                    }
                    else {
                        tone.start();
                    }
                };
                _();
            }, className: "normal-controller-start" }, "start"),
        React.createElement("button", { onClick: () => tone.pause(), className: "normal-controller-pause" }, "pause"),
        React.createElement("button", { onClick: () => tone.stop(), className: "normal-controller-stop" }, "stop")));
};
export default normalController;
