/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 * @typedef { import("webpack-chain") ChainWebpack }
 */


/**
 * @type { Options }
 */
module.exports = {
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
    },
    /** @type {ChainWebpack} */

    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.module
                .rule('vue')
                .use('ts-loader')
                .loader('ts-loader')
        }
    }
}