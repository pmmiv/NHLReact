import React, { Component } from 'react';
import '../styles/ScoreCard.css';

class ScoreCard extends Component {
  render() {
    return (
      <div className="ScoreCard card">
        <div className="card-body text-center">
          <div className="row">
            <div className="col-5">
              <p className="card-text">{this.props.game.teams.away.team.name}</p>
              <p className="card-text Score">{this.props.game.teams.away.score}</p>
            </div>
            <div className="col-2 ScoreSeparator">@</div>
            <div className="col-5">
              <p className="card-text">{this.props.game.teams.home.team.name}</p>
              <p className="card-text Score">{this.props.game.teams.home.score}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-muted">
              {this.props.game.status.detailedState}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreCard;
