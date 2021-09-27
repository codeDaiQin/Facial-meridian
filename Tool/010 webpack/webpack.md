# webpack
CommonJS 模块化
## webpack 原理
### 1. 基本概念
* Entry: 入口，webpack构建第一步从entry开始
* module:模块，在webpack中一个模块对应一个文件。webpack会从* entry开始，递归找出所有依赖的模块
* Chunk：代码块，一个chunk由多个模块组合而成，用于代码合并与分割
* Loader: 模块转换器，用于将模块的原内容按照需求转换成新内容
* Plugin:拓展插件，在webpack构建流程中的特定时机会广播对应的事件，插件可以监听这些事件的发生，在特定的时机做对应的事情

### 2. 流程概述
* 初始化参数：从配置文件(默认webpack.config.js)和shell语句中读取与合并参数，得出最终的参数
* 开始编译(compile)：用上一步得到的参数初始化Comiler对象，加载所有配置的插件，通过执行对象的run方法开始执行编译
* 确定入口：根据配置中的entry找出所有的入口文件
* 编译模块：从入口文件出发，调用所有配置的Loader对模块进行翻译,再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过处理
* 完成编译模块：经过第四步之后，得到了每个模块被翻译之后的最终内容以及他们之间的依赖关系
* 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk，再将每个chunk转换成一个单独的文件加入输出列表中，这是可以修改输出内容的最后机会
* 输出完成：在确定好输出内容后，根据配置(webpack.config.js && shell)确定输出的路径和文件名，将文件的内容写入文件系统中(fs)

## webpack 功能

## webpack Loader
### 常用的Loader
* 样式：style-loader、css-loader、less-loader、sass-loader等
* 文件：raw-loader、file-loader 、url-loader等
* 编译：babel-loader、coffee-loader 、ts-loader等
* 校验测试：mocha-loader、jshint-loader 、eslint-loader等
## webpack Plugin

## Loader 和 Plugin 的区别

## webpack和 grunt gulp 的区别

## webpack的热更新

## webpack5的新特性

## .