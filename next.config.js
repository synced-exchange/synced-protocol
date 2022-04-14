module.exports = {
  exportPathMap: async function () {
    return {
      '/frontends': {
        page: '/frontends',
      },
      '/sync': {
        page: '/sync',
      },
    }
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sync',
        permanent: true,
      },
    ]
  },
}
