var path = require('path');
module.exports = {
    entry: path.join(__dirname, 'app', 'js', 'index.js'),
    output: {
        path: path.join(__dirname, 'app', 'bundle'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            //test: path.join(__dirname, 'app', 'js'),
            test: /(\.js)/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
