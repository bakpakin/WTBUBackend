var Horseman = require('node-horseman');
var horseman = new Horseman();
var loggedIn = false;
var spinchat = module.exports

// Gets the captcha image url required to login.
function spinchat.getLoginCaptcha(cb) {
    horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    .open('http://spinitron.com/radio/playlist.php?station=wtbu&logon=1')
    .log("Opened Station URL.")
    .waitForSelector("div#recaptcha_widget_div")
    .log("Captcha Loaded.")
    .evaluate(function(selector) {
        var imageUrl = ($(selector).attr('src')); 
        return imageUrl;
    }, 'img#recaptcha_challenge_image')
    .then(function(source) {
        console.log("Captcha image found. URL: " + source);
        return cb(source);
    }, function(){
        cb(false);
    })
}

// Refresh page every once in a while to check if the session has expired.
function spinchat.pageRefresh() {
    horseman
        .reload();
}

// After getLoginCaptcha has been called, and something has answered the captcha
// call this to submit the answer to try to login. cb is a callback that will be
// called with either true or false with success or failiure respectively.
function spinchat.submitCaptchaAnswer(cb) {

}

// Submits a chat to spinitron
function spinchat.submitChat(username, messsage) {
    if (!loggedIn) return;

}
