const mongoose = require('mongoose');

/////////////////////////////////////BUYER HOMEPAGE DISPLAY
module.exports.getHomePage = function(req, res, next){
    const userEmail = req.cookies.user_email;
    res.render("userHomePage", {userEmail: userEmail, user:"buyer"})
}