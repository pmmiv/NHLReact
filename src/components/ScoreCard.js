import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/ScoreCard.css';

class ScoreCard extends Component {
  render() {
    let game = this.props.game

    let boxScoreLink = (
      <span>| <Link to={'/game/'+this.props.game.gamePk}>Box Score</Link></span>
    )

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
              {game.status.detailedState}&nbsp;{game.status.detailedState !== 'Scheduled' ? boxScoreLink : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreCard;
