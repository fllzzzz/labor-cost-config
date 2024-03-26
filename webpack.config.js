import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	mode: 'development',
	context: __dirname,
	entry: {
		main: {
			import: './main.js'
		},
	},
	output: {
		filename: '[name].bundle.js',
		path: resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.json', '...'],
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'scss-loader']
			},
			{
				test: /\.jsx$/,
				use: 'babel-loader'
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
	],
};
