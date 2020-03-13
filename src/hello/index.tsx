import * as React from 'react';
import './style.css';
import { Badge } from 'antd';
import 'antd/es/badge/style/css';

interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
const Hello = (props: HelloProps) => <h1 className="hello-color"><div>
    <Badge count={5}>
        <a href="#" className="head-example" />
    </Badge>
</div>Hello from {props.compiler} and {props.framework}!</h1>;

export default Hello;
