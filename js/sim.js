export const simulate = (radiusScale, playerStatArray, playerCircles) => {
    //init simulation
    var simulation = d3.forceSimulation()
        .force("x", d3.forceX().strength(0.05))
        .force("y", d3.forceY().strength(0.05))
        .force("collide", d3.forceCollide(function (d) { return radiusScale(d.stats.wins.length) + 1; }));

    // playerStatArray will now have force-directed x and y values
    simulation
        .nodes(playerStatArray)
        .on('tick', ticked);

    function ticked() {
        playerCircles
            .attr("cx", function (d) { return d.x })
            .attr("cy", function (d) { return d.y });
    };
}
