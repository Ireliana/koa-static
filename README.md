## 基于koa的本地静态服务器

模拟部署线上的环境

## 使用方法

1. 将打包好的文件放置到 `dist` 目录
2. 安装依赖 `cnpm i` 
3. `node main.js`
4. 访问 `http://localhost:3000`


## 原理

基于 koa 框架，`dist` 目录是静态资源目录，默认访问 `dist` 目录下 `index.html` 文件
