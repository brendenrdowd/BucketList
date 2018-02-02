var mongoose = require("mongoose"),
    User = mongoose.model('User'); 
    List = mongoose.model('List');

module.exports = {
    //dashboard functions
    newItem: function (req, res) {
        User.findOne({name:req.session.user.name}, function(err,user){
            List.create({ title: req.body.title, desc: req.body.desc,_user:req.body.users, creator:user.name, status:false}, function (err, list) {
                user._list.push((list._id))
                user.save()
                return res.json({list:list})
            })
        })
    },
    allUsers: function(req,res){
        User.find({}).exec(function(err,users){
            res.json(users)
        })
    },
    allItems: function(req,res){
        User.find({name: req.session.user.name}).populate("_List").exec(function(err,list){
            console.log(list)
            res.json(list)
        })
    },
    checkbox:function(req,res){
        List.findOne({_id:req.params.id}, function(err,list){
            if(List.status == false){
                List.update({status: true})
            }
            else if(List.status == true){
                List.update({status:false})
            }
            res.json(list)
        })
    },
    //display functions
    grabFriend: function(req,res){
        User.findOne({_id:req.params.id}, function(err,user){
            return res.json(user)
        })
    },
    userList: function(req,res){
        User.findOne({_id:req.params.id}, function(err,user){
            List.find({creator:user.name}, function(err,list){
                return res.json(list)
            })
        })
    },
    taggedList: function(req,res){
        List.find({_user:req.params.id}, function(err,tagged){
            return res.json(tagged)
        })
    },
    //login functions
    login: function (req, res) {
        User.find({ name: req.body.name }, function (err, users) { //what is users?
            if (users.length < 1) {
                User.create({ name: req.body.name }, function (err, user) {
                    req.session.user = user;
                    return res.json({ user: user })
                })
            } else {
                req.session.user = users[0];
                return res.json({ user: req.session.user })
            }
        })
    },
    checkSession: function (req, res) {
        if (req.session.user == undefined) {
            return res.json({ user: null })
        }
        return res.json({ user: req.session.user })
    },
    clearSession: function (req, res) {
        req.session.destroy();
        return res.redirect('/');
    }
}