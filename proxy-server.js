const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

proxy.on('error', (err, req, res) => {
  console.error('Proxy server error:', err);
  res.status(500).send('Proxy server error');
});

app.use(express.static('public'));

app.all('*', (req, res) => {
  // Forward the request to the target server
  proxy.web(req, res, { target: 'http://example.com' });
});

app.listen(8080, () => {
  console.log('Proxy server is running on port 8080');
});