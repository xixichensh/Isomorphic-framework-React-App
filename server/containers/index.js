import React from 'react';
import { renderToString } from 'react-dom/server';
import { layout } from './layout.js';
import { StaticRouter } from 'react-router-dom';

import App from '../../client/src/views/trade/trade.js';

//get page and switch json and html
export function index(ctx) {
  switch (ctx.accepts('json', 'html')) {
    case 'html':
      {
        const html = layout(renderToString(<StaticRouter location={ctx.url} context={{}}><App/></StaticRouter>),{isServer:true});
        ctx.body = html;
      }
      break;
    case 'json':
      {
        let callBackData = {
          'status': 200,
          'message': '这个是主页',
          'data': {}
        };
        ctx.body = callBackData;
      }
      break;
    default:
      {
        // allow json and html only
        ctx.throw(406, 'allow json and html only');
        return;
      }
  }
}
