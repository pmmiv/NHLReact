import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/ScoreCard.css';

class ScoreCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      period: null,
      periodTimeRemaining: null,
      gameFeed: null
    }
  }

  componentDidMount() {
    let gameId = this.props.gameId

    // Live feed data contains period and time remaining
    fetch("http://statsapi.web.nhl.com/api/v1/game/"+gameId+"/feed/live")
      .then(res => res.json())
      .then(
        (result) => {
          let lastPlay = result.liveData.plays.allPlays[result.liveData.plays.allPlays.length-1]

          this.setState({
            isLoaded: true,
            period: lastPlay ? lastPlay.about.period : null,
            periodTimeRemaining: lastPlay ? lastPlay.about.periodTimeRemaining : null,
            gameFeed: result
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            period: null,
            periodTimeRemaining: null,
            gameFeed: null
          })
        }
      )
  }

  render() {
    const { error, isLoaded, period, periodTimeRemaining, gameFeed } = this.state

    let boxScoreLink, gameState = null

    if(gameFeed) {
      // display box score link only if game is in progress / final
      if(gameFeed.gameData.status.detailedState !== 'Scheduled') {
        boxScoreLink = (
          <span>| <Link to={'/game/'+gameFeed.gamePk}>Box Score</Link></span>
        )
      }

      if(period && periodTimeRemaining && gameFeed.gameData.status.detailedState !== 'Final') {
        gameState = (
          <span>P{period} - {periodTimeRemaining}</span>
        )
      } else {
        gameState = (
          <span>{gameFeed.gameData.status.detailedState}</span>
        )
      }
    }

    if(!isLoaded) {
      return (
        <span></span>
      )
    } else if(error) {
      return (
        <div className="ScoreCard card">
          <div className="card-body text-center">
            <div className="row">
              {error.message}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="ScoreCard card">
          <div className="card-body text-center">
            <div className="row">
              <div className="col-5">
                <p className="card-text">{gameFeed.gameData.teams.away.name}</p>
                <p className="card-text Score">{gameFeed.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals}</p>
              </div>
              <div className="col-2 ScoreSeparator">@</div>
              <div className="col-5">
                <p className="card-text">{gameFeed.gameData.teams.home.name}</p>
                <p className="card-text Score">{gameFeed.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-muted">
                {gameState}&nbsp;{boxScoreLink}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ScoreCard;
