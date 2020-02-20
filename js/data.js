export const getPlayerData = () => {
    return new Promise( (resolve, reject) => {
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
    
            var playerStatArray = [];
            for (var key in playerStats) {
                playerStatArray.push({ 'player': key, 'stats': playerStats[key] });
            }
            resolve(playerStatArray);
        });
    });
}