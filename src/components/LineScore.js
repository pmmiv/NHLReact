import React, { Component } from 'react';
import '../styles/LineScore.css';

class LineScore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      gameFeed: null,
      lineScore: null,
      emptyPeriods: 0
    }
  }

  componentDidMount() {
    let gameId = this.props.gameId

    // Live feed data contains period and time remaining
    fetch("http://statsapi.web.nhl.com/api/v1/game/"+gameId+"/feed/live")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            gameFeed: result,
            lineScore: result.liveData.linescore,
            emptyPeriods: 3 - result.liveData.linescore.periods.length
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            gameFeed: null,
            lineScore: null,
            emptyPeriods: 0
          })
        }
      )
  }

  render() {
    const { error, isLoaded, lineScore, gameFeed, emptyPeriods } = this.state

    if(!isLoaded) {
      return (
        <span></span>
      )
    } else if(error) {
      return (
        <div>
          {error.message}
        </div>
      )
    } else {
      return (
        <div className="LineScore">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th className="text-left">P{lineScore.currentPeriod} - {lineScore.currentPeriodTimeRemaining}</th>
                {lineScore.periods.map(period => (
                  <th className="text-center">{period.num}</th>
                ))}
                {emptyPeriods > 0 ? [Array(emptyPeriods)].map((el, i) => (
                  <th className="text-center">{3-i}</th>
                )) : null}
                <th className="text-center">T</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">{gameFeed.gameData.teams.away.name}</td>
                {lineScore.periods.map(period => (
                  <td className="text-center" width="50px">{period.away.goals}</td>
                ))}
                {emptyPeriods > 0 ? [Array(emptyPeriods)].map((el, i) => (
                  <td className="text-center" width="50px">-</td>
                )) : null}
                <td className="text-center" width="50px"><strong>{gameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals}</strong></td>
              </tr>
              <tr>
                <td className="text-left">{gameFeed.gameData.teams.home.name}</td>
                {lineScore.periods.map(period => (
                  <td className="text-center" width="50px">{period.home.goals}</td>
                ))}
                {emptyPeriods > 0 ? [Array(emptyPeriods)].map((el, i) => (
                  <td className="text-center" width="50px">-</td>
                )) : null}
                <td className="text-center" width="50px"><strong>{gameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default LineScore;
