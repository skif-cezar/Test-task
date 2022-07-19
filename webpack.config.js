const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		minimizer: [
			new CssMinimizerPlugin(),
		],
	}

	if (isProd) {
		config.minimizer = [
			new TerserWebpackPlugin(),
			new CssMinimizerPlugin()
		]
	}
	return config;

}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		hot: isDev
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}