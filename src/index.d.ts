/**
 * @desc 对外输出api接口定义
 * @author Tommy
 * @date 2020-2-28
 */
import * as React from 'react';

export interface HelloProps {

}

declare const Hello: React.FunctionComponent<HelloProps>;
declare const World: React.FunctionComponent;

export {
  Hello,
  World
}
