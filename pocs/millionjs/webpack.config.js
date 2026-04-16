import { dirname, join, resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import million from "million/compiler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

console.log("Building isProduction = ", isProduction);

export default {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                tsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                            target: "es2022",
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/css/',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg)/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    plugins: [
        million.webpack({ auto: true }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: join(__dirname, 'public/index.html'),
        }),
    ],
    output: {
        filename: 'js/[name].[contenthash].js',
        path: resolve(__dirname, 'dist'),
        publicPath: isProduction ? './' : '/',
        clean: true,
    },
    devServer: {
        port: 5120,
        liveReload: true,
        historyApiFallback: true,
    },
};
