/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  proxy: {
    '/sso' : {
        target: 'http://39.96.93.7:8000',
        changeOrigin: true,
        pathRewrite: {
            '^': '',
        },
    },
      '/hdfs' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
    },
  dev: {
    '/api/': {
      target: 'http://39.96.93.7:8000',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
      '/sso' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
      '/hdfs' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
  },
  test: {
    '/api/': {
      target: 'http://39.96.93.7:8000',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
      '/sso' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
      '/hdfs' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
  },
  pre: {
    '/api/': {
      target: 'http://39.96.93.7:8000',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
      '/sso' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
      '/hdfs' : {
          target: 'http://39.96.93.7:8000',
          changeOrigin: true,
          pathRewrite: {
              '^': '',
          },
      },
  },
};
