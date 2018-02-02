const express = require("express"),
    app = express(),
    path = require("path"),
    bP = require("body-parser"),
    port = 8000,
    session = require("express-session");

app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(bP.json());
app.use(session({ secret: "tool", saveUninitialized: true }));

//comment out until mongoose & routes files are built else error
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app); //importing app and running it immediately

app.listen(port, function () {
    console.log("listening");
})