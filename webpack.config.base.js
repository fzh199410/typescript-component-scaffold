import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import pkg from './package.json';
import themeConfig from './theme';

const libraryName = pkg.libraryName;
const MODE = process.env.NODE_ENV;
const isProd = MODE === 'production';
const ASSETS_PATH = process.env.BUILD_PATH || 'build';
const JS_NAME = 'index.js';
const CSS_NAME = 'index.css';
var thirdpartyCSS = [path.resolve(__dirname, 'node_modules')];

if (!isProd) {
    thirdpartyCSS.push([path.resolve(__dirname, 'es'), path.resolve(__dirname, 'lib')]);
} 

export default function(env = {}) {
    
    return {
        mode: MODE,
        entry: {
            main: [`./src/${ isProd ? 'index' : 'dev' }.js`]
        },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, ASSETS_PATH),
            filename: JS_NAME,
            library: isProd ? libraryName : undefined,
            libraryTarget: isProd ? 'umd' : undefined
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
            alias: {
                config: path.resolve(__dirname, 'src/_config/'),
                constants: path.resolve(__dirname, 'src/_constants/'),
                fonts: path.resolve(__dirname, 'src/_fonts/'),
                images: path.resolve(__dirname, 'src/_images/'),
                styles: path.resolve(__dirname, 'src/_styles/'),
                utils: path.resolve(__dirname, 'src/utils/'),
                data: path.resolve(__dirname, 'src/_data/')
            }
        },
        optimization: {
            minimizer: isProd ? [
                new OptimizeCSSAssetsPlugin({})
            ] : undefined,
            noEmitOnErrors: true
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            }, {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }, {
                /**
                 * 主项目的css
                 */
                test: /\.(css)$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './'    // 设置css文件中的url()图片引用前缀
                    }
                },
                'css-loader',
                'postcss-loader'
                ]
            }, {
                /**
                 * 第三方组件的css, scss.
                 */
                test: /\.(css)$/,
                include: thirdpartyCSS,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /\.(woff|eot|ttf|js|svg|otf)$/,
                include: path.resolve(__dirname, 'src/_fonts'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }, {
                /**
                 * 图片加载器
                 */
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: path.resolve(__dirname, 'src/_fonts'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'images/[name]_[hash:base64:5].[ext]'
                    }
                }]
                /**
                 * 覆盖 antd 全局主题样式
                 */
            }, {
                test: /\.less$/,
                include: path.resolve(__dirname, 'node_modules/antd'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modifyVars: themeConfig,
                            javascriptEnabled: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin([`${ASSETS_PATH}/*.*`, `${ASSETS_PATH}/fonts`, `${ASSETS_PATH}/images`]),
            new CaseSensitivePathsPlugin(),                              // 文件大小写检测
            new MiniCssExtractPlugin({
                filename: CSS_NAME
            })
        ]
    };
}