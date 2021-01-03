import React from 'react';
import ReactDom from 'react-dom';

import { Component1, Component2 } from 'musicmaker';
import 'musicmaker/index.scss';
import './index.scss';

ReactDom.render(
    <>
        <Component1 />
        <Component2 />
    </>,
    document.getElementById('app')
);
