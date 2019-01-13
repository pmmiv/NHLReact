import React, { Component } from 'react';

class GoalieTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      players: []
    }
  }

  componentDidMount() {
    let players = []

    // collect all the goalies
    Object.keys(this.props.team.players).map(key => {
      let thisPlayer = this.props.team.players[key]

      if (thisPlayer.stats && thisPlayer.stats.goalieStats) {
        players.push(thisPlayer)
      }

      return true // suppresses warning
    })

    // sort by time on ice
    players.sort(function(a,b) {
      return parseFloat(b.stats.goalieStats.timeOnIce) - parseFloat(a.stats.goalieStats.timeOnIce)
    })

    this.setState({
      isLoaded: true,
      players: players
    });
  }

  render() {
    const { isLoaded, players } = this.state;
    if(!isLoaded) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Goalie</th>
              <th>Saves</th>
              <th>SV%</th>
              <th>TOI</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr>
                <td>
                  {player.person.fullName}
                </td>
                <td>
                  {player.stats.goalieStats.saves}
                </td>
                <td>
                  {player.stats.goalieStats.savePercentage ? parseFloat(Math.round(player.stats.goalieStats.savePercentage*100)/10000).toFixed(3) : '-'}
                </td>
                <td>
                  {player.stats.goalieStats.timeOnIce}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default GoalieTable;
