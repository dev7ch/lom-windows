
if (process.env.NODE_ENV === 'production') {

    module.exports = {
        presets: [
            '@vue/app'
        ],
/*
        ecmaFeatures: {
            legacyDecorators: true
        }*/

    }
} else {
    module.exports = {
        presets: [
            '@vue/app'
        ]
    }
}

