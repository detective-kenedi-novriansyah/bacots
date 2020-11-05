var path = require("path");
var common = require("./webpack.common");
var { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 9000,
    // lazy: true,
    // filename: "index_bundle.js",
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Origin": "https://lymadfamilybackend.herokuapp.com",
      "Access-Control-Allow-Methods": "GET, POST, DELETE PUT, PATCH",
      "Access-Control-Allow_Headers":
        "Origin, X-Requested-With, Accept, Content-Type, Authorization",
    },
    historyApiFallback: true,
    inline: true,
    // open: "Google Chrome",
    proxy: [
      {
        context: ["/api", "/media"],
        target: "http://localhost:8000/",
        // target: "https://lymadfamilybackend.herokuapp.com/",
        // target: 'http://db95686b58.com/',
        changeOrigin: true,
        secure: false,
      },
    ],
    open: true,
  },
});
