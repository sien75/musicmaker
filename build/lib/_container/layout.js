import React, { useEffect, useState } from 'react';
const Layout = ({ position, children }) => {
    const [style, setStyle] = useState({});
    useEffect(() => {
        setStyle({
            position: 'absolute',
            overflow: 'hidden',
            ...position,
        });
    }, [position]);
    return (React.createElement("div", { className: "mm-layout", style: style }, children));
};
export default Layout;
