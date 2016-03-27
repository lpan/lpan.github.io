import Express from 'express';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const serverPort = 8080;
const app = new Express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from './app/routes';
import WrapperComponent from './app/helpers/WrapperComponent';

// Apply server public assets and routes
app.use(Express.static(path.resolve(__dirname, '../static')));

// Render Initial HTML
function renderFullPage(html) {
  const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Lawrence Pan's Personal Website and Resume">
        <meta name="author" content="Lawrence Pan">
        <meta name="theme-color" content="#00000">
        <title>Lawrence Pan</title>
        <link rel="shortcut icon" href="/icons/icon.png" />
        <link rel="stylesheet" href=${cssPath} />
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/dist/bundle.js"></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-71554871-4', 'auto');
          ga('send', 'pageview');
        </script>
      </body>
    </html>
  `;
}

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const initialView = renderToString(
      <WrapperComponent radiumConfig={{ userAgent: req.headers['user-agent'] }}>
        <RouterContext {...renderProps} />
      </WrapperComponent>
    );

    return res.status(200).end(renderFullPage(initialView));
  });
});

// start app
app.listen(serverPort, err => {
  if (!err) {
    console.log(`Server running on port ${serverPort}`);
  }
});
