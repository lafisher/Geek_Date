var path = require("path");

var matchInfo = require("./../data/friends.js");

module.exports = function (app){

    app.get("/api/friends", function(req, res){
        console.log("get '/api/friends'");
        res.json(matchInfo);
    })

    app.post("/api/friends", function(req, res){
        console.log("post '/api/friends'");
        //take in survy answers 
        var geekAnswers = req.body;
        //convert from strings to numbers 
        for (var i = 0; i < geekAnswers.scores.length; i++){
            geekAnswers.scores[i] = parseInt(geekAnswers.scores[i]);
        };
        var geekScores = geekAnswers.scores;

        //compare answers to data in existing array and find the difference in the scores, YOWZA  
        // well i've thouroughly confused myself. there are no errors, but this doens't properly loop through 
        // it always matches to the first name in the array and won't display the picture bleh.

        var matchDif = [];
        for (var i = 0; i < matchInfo.length; i++){ 
            //loop through friends array
            var friendScores = matchInfo[i].scores;
            var totalDifference = 0;

            //for each friend loop through all scores 
            for (var j = 0; j < friendScores.length; j++){  
                var scoreDifference = Math.abs(friendScores[j] - friendScores[j]);  
                //add difference to running total 
                totalDifference += scoreDifference; 
            };
            //push the total difference to the matchDif array 
            matchDif.push(totalDifference);  
        };
        //hold the index of friend with best match
        var geekIndex = 0;  

        //hold difference of friend with best match
        var geekDifference = matchDif[0]; 
        
        //loop through all the differences
        for (var i = 1; i < matchDif.length; i++){ 
            //update geekIndex & geekDifference 
            if (matchDif[i] < geekDifference){
                geekIndex = i;
                geekDifference = matchDif[i];
            };
        };

        //push form submission to friends array
        matchInfo.push(geekAnswers);

        //send response back to client 
        var responseObject = {
            "status": "Your request has been received by the server",
            "name": matchInfo[geekIndex].name,
            "photoUrl": matchInfo[geekIndex].photo
        }
        res.json(responseObject);
    })
};