import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

export default function(env = {}) {
    return webpackMerge(baseConfig(env), {
        externals: [
            'antd',
            'echarts',
            'echarts-for-react',
            'react',
            'react-dom',
            'prop-types'
        ],
        module: {
            rules: [{
            /**
             * eslint代码规范校验
             */
                test: /\.js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, 'src'),
                // exclude: path.resolve(__dirname, 'src/_data'),
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        configFile: '.eslintrc.prod.json'
                    }
                }]
            }]
        },
        plugins: [
            // 配置全局变量
            new webpack.DefinePlugin({
                __DEV__: false,
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });
}