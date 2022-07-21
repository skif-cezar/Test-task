const dataset = require('./src/assets/data/dataset.json');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
		new CopyPlugin({
			patterns: [
				{ from: "assets/img", to: "assets/img" },
			],
		}),
		new HTMLWebpackPlugin({
			title: dataset["page_meta"]["title"],
			'meta': {
				'keywords': dataset["page_meta"]["meta_keywords"],
				'description': dataset["page_meta"]["meta_description"]
			},
			h1: dataset["page_meta"]["h1"],
			href: dataset["nav"][0]["href"],
			linkMenu1: dataset["nav"][0]["text"],
			linkMenu2: dataset["nav"][1]["text"],
			linkMenu3: dataset["nav"][2]["text"],
			linkMenu4: dataset["nav"][3]["text"],
			hrefBreadcrumbs: dataset["breadcrumbs"][0]["href"],
			linkBreadcrumbs1: dataset["breadcrumbs"][0]["text"],
			linkBreadcrumbs2: dataset["breadcrumbs"][1]["text"],
			linkBreadcrumbs3: dataset["breadcrumbs"][2]["text"],

			productTitle1: dataset["stock"][0]["title"],
			priceCurrency: dataset["stock"][0]["price_currency"],
			productPrice1: dataset["stock"][0]["price"],
			year1: dataset["stock"][0]["year"],
			mileage1: dataset["stock"][0]["mileage"],
			mileageMeasure: dataset["stock"][0]["mileage_measure"],
			axleConfiguration1: dataset["stock"][0]["axle_configuration"],

			productTitle2: dataset["stock"][1]["title"],
			productPrice2: dataset["stock"][1]["price"],
			year2: dataset["stock"][1]["year"],
			mileage2: dataset["stock"][1]["mileage"],
			axleConfiguration2: dataset["stock"][1]["axle_configuration"],

			productTitle3: dataset["stock"][2]["title"],
			productPrice3: dataset["stock"][2]["price"],
			year3: dataset["stock"][2]["year"],
			mileage3: dataset["stock"][2]["mileage"],
			axleConfiguration3: dataset["stock"][2]["axle_configuration"],

			productTitle4: dataset["stock"][3]["title"],
			productPrice4: dataset["stock"][3]["price"],
			year4: dataset["stock"][3]["year"],
			mileage4: dataset["stock"][3]["mileage"],
			axleConfiguration4: dataset["stock"][3]["axle_configuration"],

			productTitle5: dataset["stock"][4]["title"],
			productPrice5: dataset["stock"][4]["price"],
			year5: dataset["stock"][4]["year"],
			mileage5: dataset["stock"][4]["mileage"],
			axleConfiguration5: dataset["stock"][4]["axle_configuration"],

			productTitle6: dataset["stock"][5]["title"],
			productPrice6: dataset["stock"][5]["price"],
			year6: dataset["stock"][5]["year"],
			mileage6: dataset["stock"][5]["mileage"],
			axleConfiguration6: dataset["stock"][5]["axle_configuration"],

			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			},
			scriptLoading: 'defer',
			inject: 'body'
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
				test: /.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							disable: true,
						},
					},
				],
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