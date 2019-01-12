import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import './App.css';
import ScoreCard from './ScoreCard';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      games: []
    }
  }

  componentDidMount() {
    // Load today's games from NHL schedule endpoint
    fetch("http://statsapi.web.nhl.com/api/v1/schedule")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            games: result.dates && result.dates[0] ? result.dates[0].games : []
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, games } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (games && games.length){
      return (
        <div>
          <div className="jumbotron text-center">
            <h1>NHL Scoreboard</h1>
          </div>
          <div className="row">
            {games.map(game => (
              <div className="col-xs-12 col-md-6" key={game.gamePk}>
                <Link to="/game/{game.gamePk}">
                  <ScoreCard game={game}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <em>No games on the schedule for today!</em>
        </div>
      )
    }
  }
}

export default ScoreBoard;
