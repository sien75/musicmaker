import React, { useEffect, memo } from 'react';

import { MmComponentProps } from '../_types';

const ele = ({
    tone,
    track,
    should,
    updateCurrent,
}: MmComponentProps): JSX.Element => {
    useEffect(() => {
        if (should) {
            tone.scheduleMulti(track);
            updateCurrent(true);
        }
    }, [should]);
    return <></>;
};

export default memo(ele);
