import React, { useEffect } from 'react';

import { MmProps } from '../_types';

const ele = ({
    tone,
    track,
    scheduled: { should },
    onScheduled,
}: MmProps): JSX.Element => {
    useEffect(() => {
        if (should) {
            tone.scheduleMulti(track);
            onScheduled();
        }
    }, [should]);
    return (
        <div className="show-simple">
            <div>show_simple</div>
        </div>
    );
};

export default ele;
