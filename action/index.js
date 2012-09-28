var blog = require('../module/blogpost').blog;
var phantom = require("phantom");
var fs = require('fs');
var db = require('../setting').db;
var wind = Wind = require('wind');

console.log("log collection");

exports.index = function (req, res) {
    var b2c = db.collection(req.query.title);
    var action = req.params.opt,
        m = req.params.module,
        data = {};
    switch (m) {
        case  "blog":
            m = blog;
            data = {
                "user":"default",
                "blog":{
                    "title":req.query.title,
                    "content":req.query.content
                },
                "create_time":new Date(),
                "edit_titme":new Date()
            };
            break;
        case "user":
            break;
        case "scripts":
            /**
             *
             */
            var asyncphantom = eval(wind.compile("async", function (obj, i) {
                    var k = i;
                    phantom.create(function (ph) {
                        return ph.createPage(function (page) {
                            page.open("http://shop" + obj[k].sid + ".taobao.com", function (status) {
                                /*if(status === "success"){
                                 var fuc = new Function(req.query.content);
                                 return page.evaluate(fuc, function (result) {
                                 */
                                page.injectJs("public/javascripts/temp.js", function (e) {
                                    console.log("phantom async end id: " + i);
                                    ph.exit();//����ph���
                                });
                            });
                        });
                    })
                }
            ));

            /**
             * url:http://windjs.org/cn/
             */
            fs.open('public/javascripts/temp.js', 'w+', 0644, function (e, fd) {
                fs.write(fd, req.query.content, 0, 'utf8', function (e) {
                    if (e) throw e;
                    fs.closeSync(fd);
                    b2c.find({}).limit(20).toArray(function (error, obj) {
                        var excut = eval(wind.compile("async", function (obj) {
                            for (var i = 0; i < obj.length; i++) {
                                console.log("for start id: "+i)
                                $await(asyncphantom(obj, i));
                                console.log("for end id:"+i)
                            }
                            console.log("this is end ? ")
                        }));
                        excut(obj).start();
                    });
                })
            });

            break;
        default:
            break;
    }
    //m = new m();
    //m[action](data, res);
}