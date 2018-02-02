let mongoose = require("mongoose"),
    path = require("path"),
    fs = require("fs"), //file system, allows us to read or write files
    mp = path.join(__dirname, './../models'); //mp = models path

mongoose.connect('mongodb://localhost/beltTwodb'); //put outside the ' to flag it as needing to be changed, make sure to put actual name in '

fs.readdirSync(mp).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(mp + '/' + file)
    }
})
