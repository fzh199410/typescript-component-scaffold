import * as React from 'react';
import './style.css';

interface WorldProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
const Hello = (props: WorldProps) => <h1 className="world-color">World from {props.compiler} and {props.framework}! <span className="world-color-name">ad</span></h1>;

export default Hello;
