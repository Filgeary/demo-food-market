const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './public'
    }
};
