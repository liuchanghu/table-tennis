var app = angular.module("scoreboard", []);

/*
	TODO£º add service matchDB, initialize players	
*/
app.service('matchDB',  function() {

    this.players = [
        { id: 1, name: "Justin" },
        { id: 2, name: "Liam" },
        { id: 3, name: "Steve (CEO)" },
        { id: 4, name: "Dan" },
        { id: 5, name: "Lee" },
        { id: 6, name: "Gavin" },
        { id: 7, name: "Tracey" },
        { id: 8, name: "David" },
        { id: 9, name: "Sam" },
        { id: 10, name: "Chris" },
        { id: 11, name: "Joe" },
        { id: 12, name: "Emma" }
    ];

    this.leagueResults = [
        // { id: 1, name: "Joe"  , score : 10},
    ];

});


/*
	TODO£ºinitialize scope of results	
		add addLeagueResult, addResult controller,
*/
app.controller("scoreboardController", ['$scope', 'matchDB', function($scope, matchDB) {

    $scope.players = matchDB.players;

    $scope.results = [
        { id: 1, player_1: "Justin", score_1: 11, player_2: "Steve (CEO)", score_2: 6},
        { id: 2, player_1: "Steve (CEO)", score_1: 13, player_2: "Dan", score_2: 11},
        { id: 3, player_1: "Liam", score_1: 6, player_2: "Lee", score_2: 11},
        { id: 4, player_1: "Liam", score_1: 11, player_2: "Steve (CEO)", score_2: 9},
        { id: 5, player_1: "Justin", score_1: 14, player_2: "Lee", score_2: 12},
        { id: 6, player_1: "Justin", score_1: 10, player_2: "Dan", score_2: 12},
        { id: 7, player_1: "Dan", score_1: 11, player_2: "Lee", score_2: 9},
        { id: 8, player_1: "Justin", score_1: 11, player_2: "Liam", score_2: 3},
        { id: 9, player_1: "Tracey", score_1: 11, player_2: "Emma", score_2: 8},
        { id: 10, player_1: "Emma", score_1: 11, player_2: "Dan", score_2: 9}
    ];

   $scope.league = [];

   /*
	 a player wins if they reach 11 points however the player needs to win by at least 2 points.
   */
   $scope.addLeagueResult =  function(playerResult)
   {
       let leagueResult = [];
       leagueResult.name = playerResult.player;
       leagueResult.score = playerResult.score;
       if(leagueResult.score >= 11){
            leagueResult.score += 2; 
       }
       let hasPlayer = false; // player  Non-existent 
       angular.forEach(matchDB.leagueResults, function(item, index){
           if(item.name == playerResult.player){
               hasPlayer = true;
			   if(item.name.indexOf('(CEO)') != -1 ){    
					leagueResult.score = 0
			   }
			   matchDB.leagueResults[index].score += leagueResult.score; 
		   }
       });
       if( hasPlayer == false){
            matchDB.leagueResults.push(leagueResult);
       } 
   }


   angular.forEach($scope.results, function(item){
        $scope.addLeagueResult({'player': item.player_1, 'score':item.score_1});
        $scope.addLeagueResult({'player': item.player_2, 'score':item.score_2});
    }); 

    /*
		addResult to League 
	*/
    $scope.addResult = function(result) {
        result.id = $scope.results.length + 1;
     
        $scope.addLeagueResult({'player': result.player_1, 'score':result.score_1});
        $scope.addLeagueResult({'player': result.player_2, 'score':result.score_2});
        $scope.results.push(result);    
        $scope.result = {};
    } 
 
}]);


app.controller('playerController', function($scope, matchDB){

    $scope.addPlayer = function(player){
            $scope.player.id = $scope.players.length + 1;
            matchDB.players.push(player);
            $scope.player = {};
    }

});


app.controller('leagueController', ['$scope', 'matchDB',  function($scope, matchDB) {
    
     angular.forEach(matchDB.leagueResults, function(item, index){
        if(item.name.indexOf('(CEO)') != -1 ){            
            matchDB.leagueResults[index]['score'] = 0;  
        } 
    });
    
    $scope.leagueResults = matchDB.leagueResults ;
 
}]);