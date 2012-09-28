/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
    routeaction = require('./action/index')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , md = require('markdown')
  , fs = require('fs');
var app = express();

/**
 * 配置一些必要的信息 
 * 
 */
app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views'); //视图文件从哪里寻找
  app.set('view engine', 'jade');//模版引擎默认用的jade，这样，渲染模版的时候，index 会默认找index.jade
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());//支持form表单提交的post方法
  app.use(express.methodOverride());//支持put方法
  
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);//不知道干啥用的
  
});
/**
 * 用默认的处理方式
 */

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, '没办法，服务器出错了，你让我怎么办，只能告诉你，我出错啦，是不是亲')
});

app.get('/abcdefg', function(req,res){
    console.log("haha");
    res.send("var fuck = 100;");
})

//访问页面
app.get('/:pagepath/:filename.html', routes.pages);
//访问静态资源
app.get('/public/:type/:filename', routes.assets);

//访问保存数据接口
app.get('/action/:opt/:module', routeaction.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
