const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

JS_DIR = path.resolve(__dirname, 'views/src/js');
const SASS_DIR = path.resolve(__dirname, 'views/src/sass');
const BUILD_DIR = path.resolve(__dirname, 'public');

const entry = [JS_DIR + '/app.js', SASS_DIR + '/app.scss'];
const output = {
    path: BUILD_DIR,
    filename: 'js/app.js'
};

const rules = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                scss: 'vue-style-loader!css-loader!sass-loader'
            }            
        }
    },
    {
        test: /.css$/,
        use: [            
          'vue-style-loader',
          'css-loader',
        ]
    },
    {
        test: /\.js$/,
        include: [JS_DIR],
        exclude: '/node_modules',
        use: 'babel-loader'
    },
    {
        test: /\.scss$/i,        
        use: [            
            MiniCssExtractPlugin.loader, 
            // 'style-loader',
            // {
            //     loader: 'file-loader',
            //     options: {
            //         name: 'css/app.css'
            //     }
            // },            
            'css-loader',
            'sass-loader',
            'postcss-loader',
            
        ]
    },
    {
        test: /\.(png|jpg|svg|jpeg|gif|ico|WebP)$/, 
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: '../images/',
                }
            }
        ]
    }  
]

const plugins = ( argv ) => [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: ( 'production' === argv.mode ),
        cleanOnceBeforeBuildPatterns: ['**/*', '!images/**']
    }),
    new MiniCssExtractPlugin({
        filename: 'css/app.css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
    }),
];

module.exports = ( env, argv ) => ({
    watch: true,
    entry: entry,
    mode: 'development',
    output: output,    
    module: {
        rules: rules
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    plugins: plugins( argv )
});