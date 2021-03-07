import React, { useEffect, useState } from 'react';
import { Position } from '../_types';

interface Props {
    position: Position;
    children: JSX.Element | JSX.Element[];
}

const Layout = ({ position, children }: Props): JSX.Element => {
    const [style, setStyle] = useState({});

    useEffect(() => {
        setStyle({
            position: 'absolute',
            overflow: 'hidden',
            ...position,
        });
    }, [position]);

    return (
        <div className="mm-layout" style={style}>
            {children}
        </div>
    );
};

export default Layout;
