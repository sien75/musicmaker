import React, { useEffect } from 'react';
const ele = ({ tone, track, scheduled: { should }, onScheduled, }) => {
    useEffect(() => {
        if (should) {
            tone.scheduleMulti(track);
            onScheduled();
        }
    }, [should]);
    return (React.createElement("div", { className: "show-simple" },
        React.createElement("div", null, "show_simple")));
};
export default ele;
