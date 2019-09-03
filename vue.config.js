const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': resolve('./src/assets'),
                '@components': resolve('./src/components')
            }
        }
    }
}