import React from 'react';

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

export default loading;
