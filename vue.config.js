module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    configureWebpack: {
        // devtool
        devtool: 'cheap-module-eval-source-map'
    },

    productionSourceMap: true,

    pluginOptions: {
      s3Deploy: {
        registry: undefined,
        awsProfile: 'default',
        overrideEndpoint: false,
        region: 'us-east-1',
        bucket: 'project-allocation-web',
        createBucket: false,
        staticHosting: true,
        staticIndexPage: 'index.html',
        staticErrorPage: 'index.html',
        assetPath: 'dist',
        assetMatch: '**',
        deployPath: '/',
        acl: 'public-read',
        pwa: false,
        enableCloudfront: false,
        pluginVersion: '4.0.0-rc3',
        uploadConcurrency: 5
      }
    }
}
