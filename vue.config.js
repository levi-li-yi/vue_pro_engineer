const path = require('path');

const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/';
module.exports = {
  publicPath: BASE_URL, // 部署应用包的路径
	outputDir: 'dist', // 输出文件目录
	assetsDir: 'assets', // 放置静态资源目录
	filenameHashing: true, // 生成静态资源文件名包含hash值控制缓存
	lintOnSave: true, // 保存时使用'eslint-loader'检查
	productionSourceMap: false, // 生产环境是否使用source map
	chainWebpack: (config) => {
  	config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => options);
  	// 开发环境配置
		config.when(process.env.NODE_ENV === 'development', config => {
			return config.devtool('cheap-source-map')
		});
		// 生产环境
		config.when(process.env.NODE_ENV === 'production', config => {
			config.optimization.splitChunks({
				chunks: 'all',
				minSize: 0,
				maxSize: 0,
				name: true,
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial'
					},
					elementUI: {
						name: 'chunk-elementUI',
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
						priority: 20,
					},
					commons: {
						name: 'chunk-commons',
						test: path.resolve(__dirname, 'src/components'),
						priority: 5,
						minChunks:3,
						reuseExistingChunk: true,
					}
				}
			});
			config.optimization.runtimeChunk('single');
		})
	},
	devServer: {
  	open: true,
		port: 9090,
		overlay: {
  		warning: true,
			errors: true
    },
		clientLogLevel: 'none',
  },
	parallel: require('os').cpus().length > 1
};