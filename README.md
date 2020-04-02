## Nice Tutorials
Server: https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52
Combined with: https://www.npmjs.com/package/webpack-shell-plugin-next
https://github.com/webpack-contrib/webpack-hot-middleware/issues/84
https://github.com/saurabhpati/react-ts-webpack-boilerplate

## Old JS Server
```javascript
const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./../webpack.config.client.js'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`App is listening on port ${port}`) });

webpackConfig.context = path.resolve(__dirname, '..');

let compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'public')));
```
