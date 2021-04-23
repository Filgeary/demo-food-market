const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/js/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    watch: true,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: 'usage'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
};
