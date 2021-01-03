import React from 'react';
const mm = { a: 2, b: 'component' };
const ele = () => React.createElement("div", { className: "component2" }, mm.b + mm.a);
export default ele;
