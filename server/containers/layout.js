'use strict';

exports.layout = function(content, data) {
    return `
  <!DOCTYPE html>
  <html lang="zh">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

      <meta name="format-detection" content="telephone=no">
      <!--禁用手机号码链接(for iPhone)-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
      <!--自适应设备宽度-->
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <!--控制全屏时顶部状态栏的外，默认白色-->
      <meta name="apple-mobile-web-app-capable" content="yes">
      <!--是否允许全屏显，只有在桌面启动时可用-->
      <title>TTFund</title>

      <link href="./preload.css" rel="stylesheet" type="text/css">
      <script src="./preload.js"></script>
      <link rel="stylesheet" href="./dist/css/style.css">      

  </head>
  <body>
      <div id="indexView" data-pid="root/1" style="display:block">${content}</div>
      <script>
      window.__REDUX_DATA__ = ${JSON.stringify(data)};
      </script>
      <script src="./dist/js/vendor.js"></script>
      <script src="./dist/js/index.js"></script>
  </body>
  </html>
`;
};
