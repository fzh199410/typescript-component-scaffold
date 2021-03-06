import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.config.base';
import pkg from './package.json';

const { local, mock, api } = pkg.devServer;

export default function(env = {}) {
    return webpackMerge(baseConfig(env), {
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            host: 'localhost',
            port: local.port,
            disableHostCheck: true,
            compress: true,             // 开起 gzip 压缩
            inline: true,
            historyApiFallback: true,   // browserHistory路由
            contentBase: path.resolve(__dirname, 'build'),
            proxy: {
                '/proxy': {   // matches paths starting with '/api'
                    changeOrigin: true,
                    target: `${ api.host }:${ api.port }`,
                    pathRewrite: { '^/proxy': '' }
                }
            }
        },
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
                        configFile: '.eslintrc.json'
                    }
                }]
            }]
        },
        plugins: [
            // 配置全局变量
            new webpack.DefinePlugin({
                __DEV__: true,
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new HtmlWebpackPlugin({                             // 主页面入口index.html
                filename: 'index.html',
                template: './src/template.html'
            })
        ]
    });
}