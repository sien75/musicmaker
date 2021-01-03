import React from 'react';
const mm = { a: 1, b: 'component' };
const ele = () => React.createElement("div", { className: "component1" }, mm.b + mm.a);
export default ele;
