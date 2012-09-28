var db = require('../setting').db;
//生成collection对象
var blogdb = db.collection("blog");
console.log("连接了blog collection");
var jsonwrong = {"state":"1", "message":"成功", "data":{"redirect":""}};
var jsonright = {"state":"1", "message":"成功", "data":{"redirect":""}};
function blog() {

}
/**
 * 保存blog
 * @param data
 */
blog.prototype.save = function (data, res) {
//mongoDB存数据
    blogdb.save(data, function (err) {
        if (err) {
            res.send(jsonwrong);
        } else {
            res.send(jsonright);
        }
    });
};

exports.blog = blog;