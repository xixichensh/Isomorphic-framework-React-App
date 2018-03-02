
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//srcDir为当前开发目录(默认:/src)
const srcDir = resolve(process.cwd(), 'src'),
  //assetsDir为当前建立目录(默认:/assets)
  assetsDir = resolve(process.cwd(), '../public'),
  //生成JS的目录地址(默认:)
  jsDir = 'dist/js/',
  //生成css的目录地址(默认:)
  cssDir = 'dist/css/';

module.exports = {
    
    devtool:false,

    entry:{
        index: './src/index.js',
        vendor:['babel-polyfill']
    },

    output: {
        path: assetsDir,
        filename: jsDir + '[name].js',
        publicPath: "/"
    },

    plugins: [
        new ExtractTextPlugin('dist/css/style.css'),

        new webpack.optimize.UglifyJsPlugin({
            comments: false,        //去掉注释
            compress: {
                warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
            }
        }),

        new webpack.ProvidePlugin({
            'Promise':      'es6-promise',
            'fetch':        'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
            "React":        'react',
            "ReactDOM":     'react-dom',
            "Component":    ['react', 'Component'],
            "PropTypes":    'prop-types'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            filename: 'index.html',
            //要把script插入到标签里
            inject: 'body',
            chunks:["vendor","index"]
        }),

        new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: Infinity,
        })

    ],
    
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                            {
                                loader: 'css-loader?sourceMap',
                                options: {
                                    minimize: true,
                                    modules: true,
                                    localIdentName: '[name]-[local]-[hash:base64:5]',
                                    importLoaders: 2
                                }
                            },
                            { 
                                loader: 'postcss-loader', 
                                options: { 
                                    sourceMap: true 
                                } 
                            },
                            'less-loader?sourceMap'
                        ]
                })
                    
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:8192 // 图片小于8k就转化为 base64, 或者单独作为文件
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js','.css','.less'],
        modules: ['node_modules','components','views','resources','plugins','libs'],
        alias: {
            'jquery':           resolve(srcDir, 'libs/zepto'),
            'md5':           	resolve(srcDir, 'libs/md5'),
            'base64':           resolve(srcDir, 'libs/base64'),

            'common':           resolve(srcDir, 'plugins/common'),
            'ttfund':           resolve(srcDir, 'plugins/ttfund'),
            'requestmodel':     resolve(srcDir, 'plugins/requestmodel'),
            'nativebridge':     resolve(srcDir, 'plugins/nativebridge'),
            'routerhelper':     resolve(srcDir, 'plugins/routerhelper'),
        }
    }


};