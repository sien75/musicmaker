import React, { memo } from 'react';

interface Props {
    children: string;
}

const loading = ({ children }: Props): JSX.Element => {
    return (
        <div>
            loading...
            <div>{children}</div>
        </div>
    );
};

export default memo(loading);
