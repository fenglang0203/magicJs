var fs = require("fs");
var path = require('path');
var blog = require('../module/blogpost');

/**
 * 首页，理论上也应该属于页面界别的啦
 * @param req
 * @param res
 */

/**
 * 静态资源统一处理，public下面的路由
 * @param req
 * @param res
 */
exports.assets = function (req, res) {
    var urlPath = [
        // 获取相对路径, 我的应该是:
        // /Users/lvjian/projects/nodejs/nodeblog
        process.cwd(),
        '/public/',
        req.params.type + "/",
        req.params.filename
    ].join('');

    var filePath = path.normalize(urlPath)
    path.exists(filePath, function (exists) {
        if (!exists) {
            res.send('访问资源不存在，咋整啊')
        } else {
            var content = fs.readFileSync(filePath, 'utf-8');
            res.send(content);
        }
    });
};

/**
 * 页面级别统一处理，目前只有create页面
 * @param req
 * @param res
 */
exports.pages = function (req, res) {
    res.render(req.params.pagepath + "/" + req.params.filename, { title:'我是title数据啦' });
}


exports.saveblog = function (req, res) {
    var b = new blog.blog();
    var data = {
        "user":"default",
        "blog":{
            "title":req.query.title,
            "content":req.query.content
        },
        "create_time":new Date()
    }
    //保存数据
    res.send(b.save(data, req, res));
}


