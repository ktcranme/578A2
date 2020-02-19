/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
var t = d3.transition().duration(750);

var margin = { left: 0, right: 0, top: 0, bottom: 0 };

var width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.csv("10yearAUSOpenMatches.csv").then(function (data) {
    var playerStats = {};
    // Clean data
    data.forEach(function (d) {
        if (typeof playerStats[d['player1']] === 'undefined') {
            playerStats[d['player1']] = {
                'wins': [],
                'losses': [],
                'byTheYears': {}
            };
        }
        if (typeof playerStats[d['player2']] === 'undefined') {
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
        if (d['round'] == 'Final') {
            playerStats[d['player1']]['byTheYears'][d['year']] = 'Champion';
        }
    });

    var playerStatArray = []
    for (var key in playerStats) {
        playerStatArray.push({ 'player': key, 'stats': playerStats[key] })
    }

    // var playerCircles = g.selectAll("circle")
    //     .data(playerStatArray, function (d) {
    //         return d['player'];
    //     });

    //tooltip DIV
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    playerCircles = g.selectAll()
        .data(playerStatArray)
        .enter()
        .append("circle")
        // .attr("cx", function(d){ return Math.random() * 1000 })
        .attr("r", function (d) {
            // return 10;
            return d.stats.wins.length;
        })
        .attr("fill", "grey")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("mouseover", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(`<p style="color:"black">${d.player} (${d.stats.wins.length})</p>`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    //simulation
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2).strength(0.005))
        .force("y", d3.forceY(width / 2).strength(0.005))
        .force("collide", d3.forceCollide(10))
    simulation.nodes(playerStatArray)
        .on('tick', ticked);
    function ticked() {
        playerCircles.attr("cx", function (d) { return d.x })
            .attr("cy", function (d) { return d.y })
    }
});
