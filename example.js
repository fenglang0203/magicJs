var wind = Wind = require('wind');
var a = wind.compile("async", function (e) {
    for (var i = 0; i < 10; i++) {
        var k = i;
        setTimeout(function () {
            console.log(2)
        }, 10)
    }
});