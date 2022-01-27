import React, { useEffect } from 'react';

import { MmComponentProps } from '../_types';

const ele = ({
    tone,
    track,
    scheduled,
    scheduled: { should, current },
    setScheduled,
}: MmComponentProps): JSX.Element => {
    useEffect(() => {
        tone.scheduleMulti(track);
        setScheduled({ ...scheduled, current: current + 1 });
    }, [should]);
    return (
        <div className="show-simple">
            <div>show_simple</div>
        </div>
    );
};

export default ele;
