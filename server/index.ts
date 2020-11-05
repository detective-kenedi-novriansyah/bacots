var express = require('express');
var path = require('path');
var webpackConfig = require('../config/webpack.prod');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var createProxyMiddleware = require('http-proxy-middleware')

var devConfig = webpackConfig.devServer;
var app = express();
var compiler = webpack(webpackConfig);

console.log(devConfig.proxy[0].target)

app.use(express.static(devConfig.contentBase || __dirname));
app.use(webpackDevMiddleware(compiler, {}));
app.use(webpackHotMiddleware(compiler));

// Set up the proxy.
if(devConfig.proxy) {
  Object.keys(devConfig.proxy).forEach(function(context) {
      console.log(context)
      app.use(devConfig.proxy[0].context, createProxyMiddleware({ target:  devConfig.proxy[0].target, changeOrigin: devConfig.proxy[0].changeOrigin, secure: devConfig.proxy[0].secure}))
  });
}

if(devConfig.historyApiFallback) {
  console.log('404 responses will be forwarded to /index.html');

  app.get('*', function(req, res) {
    res.sendFile(path.join(devConfig.contentBase, 'index.html'));
  });
}

app.listen(devConfig.port || 8080, function() {
  console.log('Development server listening on port ' + devConfig.port);
});
