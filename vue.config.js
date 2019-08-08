module.exports = {
  devServer: {
    proxy: {
      '/api/event': { target: 'http://localhost:9095' },
      '/api/user': { target: 'http://localhost:9084' },
    },
  },
}