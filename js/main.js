/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

import { simulate } from './sim.js';
import { getPlayerData } from './data.js';

var t = d3.transition().duration(750);
var margin = { left: 0, right: 0, top: 0, bottom: 0 };
var width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Select chart div and add svg and g
var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");


getPlayerData().then(function (playerStatArray) {

    // Scale radii of circles. each circle is the player's total number of wins(scaled)
    var maxWins = Math.max.apply(Math, playerStatArray.map(data => { return data.stats.wins ? data.stats.wins.length : 0 }));
    var radiusScale = d3.scaleSqrt().domain([0, maxWins]).range([5, 30]);

    //tooltip on hover to show circle details
    var tooltipDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    //create circles
    var playerCircles = g.selectAll()
        .data(playerStatArray)
        .enter()
        .append("circle")
        .attr("r", function (d) {
            return radiusScale(d.stats.wins.length);
        })
        .attr("fill", "grey")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("mouseover", function (d) {
            tooltipDiv.transition()
                .duration(200)
                .style("opacity", 1);
            tooltipDiv.html(`<p style="color:"black">${d.player} (${d.stats.wins.length})</p>`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltipDiv.transition()
                .duration(500)
                .style("opacity", 0);
        });
    
    //call simulation
    simulate(radiusScale, playerStatArray, playerCircles);
});


