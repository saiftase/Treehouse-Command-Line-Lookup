var profile = require("./profile")
var users = process.argv.slice(2); //Allow command line arguments, i.e. node app.js saiftase
users.forEach(profile.get);