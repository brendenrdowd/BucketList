var main = require('../controllers/MainController.js');
var path = require("path");

module.exports = function (app) {
    //login routes
    app.post('/login', function (req, res) {
        main.login(req, res);
    })
    app.get('/dashboard_backend', function (req, res) {
        main.checkSession(req, res);
    })
    app.get('/logout', function (req, res) {
        main.clearSession(req, res);
    })
    //list routes
    app.post('/newItem', function(req,res){
        main.newItem(req,res);
    })
    app.get('/allUsers', function(req,res){
        main.allUsers(req,res);
    })
    app.get('/allItems', function(req,res){
        main.allItems(res,res);
    })
    app.get('/displayUser/:id', function(req,res){
        main.grabFriend(req,res);
    })
    app.get('/userList/:id', function(req,res){
        main.userList(req,res);
    })
    app.get('/check/:id', function(req,res){
        main.checkbox(req,res);
    })
    app.get('/taggedList/:id', function(req,res){
        main.taggedList(req,res);
    })
    app.all("**", (request, response) => { response.sendFile(path.resolve("./client/dist/index.html")) });
}