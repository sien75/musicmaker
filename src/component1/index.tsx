import React from 'react';

interface MM {
    a: number;
    b: string;
}

const mm: MM = { a: 1, b: 'component' };

const ele = (): JSX.Element => <div className="component1">{mm.b + mm.a}</div>;

export default ele;
