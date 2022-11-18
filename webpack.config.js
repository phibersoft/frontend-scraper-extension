const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    mode: "production",
    entry: {
        content: path.join(__dirname, "src", "content.ts"),
        popup: path.join(__dirname, "src", "popup", "popup.tsx")
    },
    output: {path: path.join(__dirname, "dist"), filename: "[name].js"},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            }
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "public", to: "."},
                ...["popup"]
                    .map((name) => {
                        return [
                            {
                                from: `src/${name}/${name}.html`,
                                to: `${name}.html`,
                            },
                            {
                                from: `src/${name}/${name}.css`,
                                to: `${name}.css`,
                            },
                        ];
                    })
                    .flat(),
            ],
        }),
    ],
};

module.exports = config;
