const Koa = require('koa');

const app = new Koa();

const server = require('koa-static');

const fs = require('fs');

const path = require('path');

const Router = require('koa-router')

function resolve(src) {
    return path.resolve(__dirname, src);
}

const router = new Router();

// 匹配路径
router.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(resolve('dist/index.html'));
})
.get('/xxx', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(resolve('dist/index.html'));
})
.get('/404', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(resolve('dist/404.html'));
})

app.use(router.routes());

       
// 静态资源目录
app.use(server(resolve('dist')));

app.listen(3000);

console.log('now listening at port 3000...');