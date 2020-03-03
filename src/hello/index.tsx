import * as React from "react";
import './style.css';

interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
const Hello = (props: HelloProps) => <h1 className="hello-color">Hello from {props.compiler} and {props.framework}!</h1>;

export default Hello;