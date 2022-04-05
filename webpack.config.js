const path = require('path')

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname,'scripts/script.js'),
    output: {
        path: path.resolve(__dirname,'scripts'),
        filename: 'bundle.js'
    }
}