/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
var t = d3.transition().duration(750);

var margin = { left:0, right:0, top:0, bottom:0 };

var width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");



d3.csv("10yearAUSOpenMatches.csv").then(function(data){
    var playerStats = {};
    // Clean data
    data.forEach(function(d) {
        if(typeof playerStats[d['player1']] === 'undefined'){
            playerStats[d['player1']] = {
                'wins': [],
                'losses': [],
                'byTheYears': {}
            };
        }
        if(typeof playerStats[d['player2']] === 'undefined'){
            playerStats[d['player2']] = {
                'wins': [],
                'losses': [],
                'byTheYears': {}
            };
        }

        //put the players record into the players object
        playerStats[d['player1']]['wins'].push(d);
        playerStats[d['player2']]['losses'].push(d);

        //put the losers round out into the byTheYears field
        playerStats[d['player2']]['byTheYears'][d['year']] = d['round'];
        //if its the finals, indicate that that player was the champion that year
        if(d['round'] == 'Final')
        {
            playerStats[d['player1']]['byTheYears'][d['year']] = 'Champion';
        }
    });

    var playerStatArray = []
    for(var key in playerStats){
        playerStatArray.push({'player': key, 'stats': playerStats[key]})
    }



    var playerCircles = g.selectAll("circle")
        .data(playerStatArray, function(d){
            return d['player'];
        });
    playerCircles.enter()
        .append("circle")
            .attr("cx", function(d){ return Math.random() * 1000 })
            .attr("r", 5)
            .attr("fill", "grey")
            .attr("cy", function(d){ return Math.random() * 1000 })
});