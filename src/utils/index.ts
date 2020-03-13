import { useEffect, useRef, useState } from 'react';

/**
 * @description MRO业务公共组件调用的公共方法
 * @author Tommy
 * @date 2020-03-04
 */

const config = {
    imageBaseUrl: "http://image.jc.yzw.cn.qa:8000",
    loginUrl: "http://sso-dev.yzw.cn.qa/sso/login.do",
    logoutUrl: "http://sso-dev.yzw.cn.qa/sso/logout.do",
    imageDownloadUrl: "http://file.jc.yzw.cn.qa:8000/DownLoadHandler.ashx",
    regUrl: "/supplier/register"
};

/**
 * 构建item图片地址
 * @param filename item图片地址
 * @param size 图片尺寸, p60, p68, p120, p160, p200, p240, p360, p450, p800
 * @return {*}
 */


const buildProductImageUrl = (filename: string, size: string) => {
    size = size  || 'p60';

    const reg = /(http|https):\/\/([\w.]+\/?)\S*/;

    if (reg.test(filename)) {
        return filename;
    } else {
        return config.imageBaseUrl + '/pdt/' + size + '/' + filename;
    }
};

const formatPrice = (price: number) => {
    return price.toFixed(2);
};

// hooks ==========================================================

/**
 * 事件绑定hook
 * @param ref
 * @param eventName
 * @param bindFn
 * @param options
 */
const useEventListener = (ref: any, eventName: string, bindFn: Function, options?: Object) => {

    const callbackRef = useRef<any>();

    useEffect(() => {
        callbackRef.current = bindFn;
    });

    useEffect(() => {
        if ('current' in ref) {
            ref = ref.current;
        }
    });

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            callbackRef.current(e);
        };

        if (ref) {

            ref.addEventListener(eventName, handler, options || {});

            return () => {
                ref.removeEventListener(eventName, handler, options || {});
            };

        }

    }, [ref, eventName, options]);
};

const useHover = (ref: any) => {

    const [isHover, setState] = useState(false);

    const hoverIn = (e: MouseEvent) => {
        e.stopImmediatePropagation();
        setState(true);
    };

    const hoverOut = (e: MouseEvent) => {
        e.stopImmediatePropagation();
        setState(false);
    };

    useEventListener(ref, 'mouseover', hoverIn);
    useEventListener(ref, 'mouseout', hoverOut);

    return isHover;
};

export {
    buildProductImageUrl,
    formatPrice,
    useEventListener,
    useHover
};
