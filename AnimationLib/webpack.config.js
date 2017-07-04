module.exports = {
  entry: {
    animation: './src/animation.js'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    library: 'animation', // 会在全局的window上创建一个animation变量
    libraryTarget: 'umd'
  }
}