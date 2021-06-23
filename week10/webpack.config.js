module.exports = {
    // entry: './main.js',
    entry: './index.js',
    // entry: './animation-test.js',
    // entry: './gesture.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-react-jsx",
                                {
                                    pragma: "creatElement"
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
}


