var db = require('../setting').db;
//����collection����
var blogdb = db.collection("blog");
console.log("������blog collection");
var jsonwrong = {"state":"1", "message":"�ɹ�", "data":{"redirect":""}};
var jsonright = {"state":"1", "message":"�ɹ�", "data":{"redirect":""}};
function blog() {

}
/**
 * ����blog
 * @param data
 */
blog.prototype.save = function (data, res) {
//mongoDB������
    blogdb.save(data, function (err) {
        if (err) {
            res.send(jsonwrong);
        } else {
            res.send(jsonright);
        }
    });
};

exports.blog = blog;