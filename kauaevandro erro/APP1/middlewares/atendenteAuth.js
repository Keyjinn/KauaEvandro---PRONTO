const req = require("express/lib/request");

function auth(req,res,next){
    if(req.session.atendente){
        next();
    } else{
        res.redirect("/atendente/login");
    }
}

module.exports = auth;