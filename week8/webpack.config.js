module.exports = {
    // entry: './main.js',
    entry: './carousel.js',
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


