const rspack = require("@rspack/core");
const { VueLoaderPlugin } = require("vue-loader");
const WebpackObfuscator = require('webpack-obfuscator');
const isDev = process.env.NODE_ENV == "development";
/** @type {import('@rspack/cli').Configuration} */

const config = {
	context: __dirname,
	entry: {
		main: "./src/main.js"
	},
	resolve: {
		extensions: ["...", ".ts"]
	},
	plugins: [
		new VueLoaderPlugin(),
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					experimentalInlineMatchResource: true
				}
			},
			{
				test: /\.(js|ts)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: false
								}
							},
							env: {
								targets: [
									"chrome >= 87",
									"edge >= 88",
									"firefox >= 78",
									"safari >= 14"
								]
							}
						}
					}
				]
			},
			{
				test: /\.svg/,
				type: "asset/resource"
			},
			{
				test: /test\.js$/,
				exclude: [],
				enforce: 'post',
				use: {
						loader: WebpackObfuscator.loader,
						// https://github.com/javascript-obfuscator/javascript-obfuscator#medium-obfuscation-optimal-performance
						options: {
								// compact: true,
								// controlFlowFlattening: true,
								// controlFlowFlatteningThreshold: 0.75,
								// deadCodeInjection: true,
								// deadCodeInjectionThreshold: 0.4,
								// debugProtection: false,
								// disableConsoleOutput: false,
								// identifierNamesGenerator: 'hexadecimal',
								// log: false,
								// numbersToExpressions: true,
								// renameGlobals: false,
								selfDefending: true,
								// simplify: true,
								// splitStrings: true,
								// splitStringsChunkLength: 10,
								// stringArray: true,
								// stringArrayCallsTransform: true,
								// stringArrayCallsTransformThreshold: 0.75,
								// stringArrayEncoding: ['base64'],
								// stringArrayIndexShift: true,
								// stringArrayRotate: true,
								// stringArrayShuffle: true,
								// stringArrayWrappersCount: 2,
								// stringArrayWrappersChainedCalls: true,
								// stringArrayWrappersParametersMaxCount: 4,
								// stringArrayWrappersType: 'function',
								// stringArrayThreshold: 0.75,
								// transformObjectKeys: true,
								// unicodeEscapeSequence: false,
						},
				},
			}
		]
	}
};
module.exports = config;
