import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/ScoreCard.css';

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      period: null,
      periodTime: null
    }
  }

  componentDidMount() {
    let game = this.props.game

    // Live feed data contains period and time remaining
    fetch("http://statsapi.web.nhl.com"+game.link)
      .then(res => res.json())
      .then(
        (result) => {
          let lastPlay = result.liveData.plays.allPlays[result.liveData.plays.allPlays.length-1]

          this.setState({
            isLoaded: true,
            period: lastPlay.about.period,
            periodTimeRemaining: lastPlay.about.periodTimeRemaining
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            period: null,
            periodTimeRemaining: null
          });
        }
      )
  }

  render() {
    const { error, isLoaded, period, periodTimeRemaining } = this.state
    const { game } = this.props

    let boxScoreLink = (
      <span>| <Link to={'/game/'+game.gamePk}>Box Score</Link></span>
    )

    let gameState = (
      <span>{game.status.detailedState}</span>
    )
    if(period && periodTimeRemaining && game.status.detailedState !== 'Final') {
      gameState = (
        <span>P{period} - {periodTimeRemaining}</span>
      )
    }

    if(!isLoaded) {
      return (
        <span>Loading...</span>
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
                <p className="card-text">{game.teams.away.team.name}</p>
                <p className="card-text Score">{game.teams.away.score}</p>
              </div>
              <div className="col-2 ScoreSeparator">@</div>
              <div className="col-5">
                <p className="card-text">{game.teams.home.team.name}</p>
                <p className="card-text Score">{game.teams.home.score}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-muted">
                {gameState}&nbsp;{game.status.detailedState !== 'Scheduled' ? boxScoreLink : ''}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ScoreCard;
