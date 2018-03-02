const path =                require('path');
const resolve =             path.resolve;
const webpack =             require('webpack');

const HtmlWebpackPlugin =   require('html-webpack-plugin');

//srcDir为当前开发目录(默认:/src)
const srcDir =              resolve(process.cwd(), 'src');
//assetsDir为当前建立目录(默认:/assets)
const assetsDir =           resolve(process.cwd(), 'assets');
//生成JS的目录地址(默认:)
const jsDir =               'dist/js/';
//生成css的目录地址(默认:)
const cssDir =              'dist/css/';

module.exports = {
    
    devtool:'cheap-module-eval-source-map',
	
    entry:{
        "index":['babel-polyfill','./src/index.js']
    },
	
    output: {
        path: assetsDir,
        filename: jsDir + '[name].js',
        publicPath: '/'
    },

    devServer:{
        hot:true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: [
                'index'
            ],
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.ProvidePlugin({
            "React":        'react',
            "ReactDOM":     'react-dom',
            "Component":    ['react', 'Component'],
            "PropTypes":    'prop-types'
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader?sourceMap',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 2
                        }
                    },
                    
                    { loader: 'postcss-loader', options: { sourceMap: true } },

                    'less-loader?sourceMap'
                ]
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
        extensions: ['.js','.css','.less','.scss'],
        modules: ['node_modules','components','views','resources','plugins','libs'],
        alias: {
            'jquery':           resolve(srcDir, 'libs/zepto'),
            'md5':           	resolve(srcDir, 'libs/md5'),
            'base64':           resolve(srcDir, 'libs/base64'),

            'common':           resolve(srcDir, 'plugins/common'),
            'ttfund':           resolve(srcDir, 'plugins/ttfund'),
            'requestmodel':     resolve(srcDir, 'plugins/requestmodel'),
            'nativebridge':     resolve(srcDir, 'plugins/nativebridge')
        }
    }

};