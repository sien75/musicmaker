import React from 'react';
const loading = ({ children }) => {
    console.log('[MM]', children);
    return (React.createElement("div", null,
        "loading...",
        React.createElement("div", null, children)));
};
export default loading;
