const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    // The background service is automatically switched based on the connected network
    createProxyMiddleware('/api', {
      target:
        process.env.NODE_ENV === 'development'
          ? 'https://sns.chat'
          : 'https://sns.chat',
      changeOrigin: true
    })
  )
}
