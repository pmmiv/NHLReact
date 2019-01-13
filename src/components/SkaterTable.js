import React, { Component } from 'react';

class SkaterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      players: []
    }
  }

  componentDidMount() {
    let players = []

    // collect all the skaters
    Object.keys(this.props.team.players).map(key => {
      let thisPlayer = this.props.team.players[key]

      if (thisPlayer.stats && thisPlayer.stats.skaterStats) {
        players.push(thisPlayer)
      }

      return true // suppresses warning
    })

    // sort by time on ice
    players.sort(function(a,b) {
      return parseFloat(b.stats.skaterStats.timeOnIce) - parseFloat(a.stats.skaterStats.timeOnIce)
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
              <th>Skater</th>
              <th>Goals</th>
              <th>Assists</th>
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
                  {player.stats.skaterStats.goals}
                </td>
                <td>
                  {player.stats.skaterStats.assists}
                </td>
                <td>
                  {player.stats.skaterStats.timeOnIce}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default SkaterTable;
