
var mongo = require("mongoskin");
var db_url = exports.db_url = "admin:123456@127.0.0.1:27017/db";
exports.db = mongo.db(db_url);
