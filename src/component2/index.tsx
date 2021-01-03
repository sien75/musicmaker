import React from 'react';

interface MM {
    a: number;
    b: string;
}

const mm: MM = { a: 2, b: 'component' };

const ele = (): JSX.Element => <div className="component2">{mm.b + mm.a}</div>;

export default ele;
