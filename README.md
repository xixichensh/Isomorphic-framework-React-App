# Isomorphic-framework-React-App-
Isomorphic framework for server-rendered React apps


这是将React客户端App进行同构至服务器端渲染的 demo，可作为开发模板使用。

框架中有客户端和服务器端两部分，其中客户端部分使用Webpack和React的整合，将编译后的文件生成到根目录下的Publish文件夹下，服务器使用Pubilsh文件下的样式文件进行服务器端渲染。服务器端使用KOA来起服务。这个是入门小例子

框架目的：支持React App在服务器端渲染，有利于部分APP做SEO。

实现内容：使用KOA并使用客户端的React模版进行页面渲染。

使用组件： 1. zepto

---------

## Requirements
 - [Node.js](https://nodejs.org)
 - [npm](https://www.npmjs.com/)
 - [grunt](https://github.com/gruntjs/grunt/)


## Usage
####安装
```
git clone https://github.com/xixichensh/Isomorphic-framework-React-App-.git
cd client
npm install
npm run build-webpack
回到根目录
npm install
npm run koa
```
