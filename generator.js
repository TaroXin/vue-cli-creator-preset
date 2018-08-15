module.exports = (api, options, rootOptions) => {
    // 修改 `package.json` 里的字段
    api.extendPackage({
      scripts: {
        test: 'vue-cli-service test',
        'build:android': 'echo "Build"'
      }
    })
  
    // 复制并用 ejs 渲染 `./template` 内所有的文件
    if (options.foo) {
      // 有条件地生成文件
    }
  }