module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blog-page/'
    : '/'
}