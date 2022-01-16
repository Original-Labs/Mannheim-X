const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://47.115.58.34',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
