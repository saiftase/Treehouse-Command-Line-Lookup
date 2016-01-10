//Problem: We need a simple way to look at a user's badge count and Javascript points.
var legacyHttp = require("http");
var http = require("https");


//Print out message
function printMessage(username, badgeCount, points){
  var message = username + " has " +  badgeCount + " total badge(s) and " + points + " points in Javascript";
  console.log(message);
}
  
//Print out error messages
function printError(error){
  console.error(error.message);
}

//Get relevant data for user
function get(username){
  //Connect to the API URL
  //http://teamtreehouse.com/saiftase.json
  var request = http.get("https://teamtreehouse.com/" + username + ".json", function(response){
    //console.log(response.statusCode);
    
    var body = "";
    response.on('data', function(chunk) {
      //node.js uses non-blocking streams.
      body += chunk;
    }); 
    
    response.on('end', function(){
      if(response.statusCode === 200){
        try{
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript)
        }catch(error){
          //Parse Error
          printError(error);
        }
      }else{
        //Status Code Error
        printError({message: "There was an error getting the profile for " + username + ". (" + legacyHttp.STATUS_CODES[response.statusCode] + ")"});
      }
    });
    
  });
  
  //Connection Error
  request.on("error", printError); 
}

//Module
module.exports.get = get;