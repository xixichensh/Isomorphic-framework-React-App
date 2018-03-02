import Koa          from 'koa';
import Router       from 'koa-router';

import Logger       from 'koa-logger';
import Serve        from "koa-static2";
import Compress     from "koa-compress";
import BodyParser   from "koa-bodyparser";
import Json         from "koa-json";
import Session      from "koa-session";

import Routers      from './server/route/router';


//初始化koa对象
const App = () => {
    //创建koa服务器应用
    let app = new Koa();
  
    app.use(Logger());

    //使用gzip压缩
    app.use(Compress({
        filter: function(content_type) {
            return /text/i.test(content_type)
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }));

    //get request body
    app.use(BodyParser());

    //send request json
    app.use(Json({pretty: false}));

    //use static dir
    app.use(Serve("", __dirname + "/public"));

      //session
    const CONFIG = {
        key: 'listenlite:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true
    };
    app.use(Session(CONFIG, app));

    app.use(Routers);

    return app;
};

//Creat koa server and listen
var creatServer = () => {
    const app = App();
    app.listen(8080, function(err) {
        if (err) console.log(err);
        console.log('Listening at localhost:' + 8080);
    });
};
  
//调用创建koa服务器方法
creatServer();