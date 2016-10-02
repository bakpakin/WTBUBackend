var url = require('url');
var spinitron = require('spinitron-spinpapi');
var fs = require('fs');
var secret = process.env.SPIN_SECRET || fs.readFileSync("./spinitron/secret.txt", "utf8").trim();
var userid = process.env.SPIN_USERID || fs.readFileSync("./spinitron/userid.txt", "utf8").trim();
var stringify = require("json-stable-stringify");

// Create spinitron object.
spinitron = new spinitron({
    station: 'wtbu',
    userid: userid,
    secret: secret
});

var apiCaches = {};
function addApiGetter(app, name) {
    var spinName = "get" + name.charAt(0).toUpperCase() + name.slice(1);
    apiCaches[name] = {};
    app.get('/' + name, function(req, res) {
        var parameters = url.parse(req.url, true).query;
        var parameterKey = stringify(parameters);
        var cache = apiCaches[name];
        if (cache[parameterKey]) {
            console.log("Returning cached response.");
            res.send(cache[parameterKey]);
        } else {
            console.log("Querying Spinitron for data.");
            spinitron[spinName](parameters, function(error, results) {
                var resultsToSend = {
                    request: results.request,
                    errors: results.errors,
                    success: results.success,
                    results: results.results
                };
                if (!error) {
                    cache[parameterKey] = resultsToSend;
                }
                res.send(resultsToSend);
            });
        } 
    });
}

module.exports.addApiMiddleware = function(app) {
    addApiGetter(app, 'song');
    addApiGetter(app, 'songs');
    addApiGetter(app, 'currentPlaylist');
    addApiGetter(app, 'playlistInfo');
    addApiGetter(app, 'playlistsInfo');
    addApiGetter(app, 'showInfo');
    addApiGetter(app, 'regularShowsInfo');
}

// Clear cache after certain amount of time. Currently clears cache every minute.
setInterval(function() {
    for (var key in apiCaches) {
        apiCaches[key] = {};
    }
    console.log("Cache cleared.");
}, 60000);
