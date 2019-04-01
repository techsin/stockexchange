const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const glob = require("glob");
const PRODUCTION = process.env.NODE_ENV === "production";
const hotware = PRODUCTION ? [] : ["webpack/hot/dev-server", "webpack-hot-middleware/client"];
const entry = {};

//load all entry points
glob.sync("./app/frontend/js/*.js").forEach(function (fpath) {
	let filename = path.basename(fpath, path.extname(fpath));
	entry[filename] = [...hotware, fpath]
});

const plugins = PRODUCTION
	? [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
	: [
		new webpack.HotModuleReplacementPlugin()
	];

module.exports = {
  entry,
  plugins,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
	path: path.join(__dirname, "./dist/public/js"),
	publicPath: "/js/",
	filename: "[name].js"
  }
};