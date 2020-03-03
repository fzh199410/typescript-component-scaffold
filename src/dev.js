import React from 'react';
import ReactDOM from 'react-dom';
import { Hello, World } from './index';

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <World compiler="TypeScript" framework="React" />
    </div>,
    document.getElementById('app')
);