import React, { Component } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ScoreBoard from './ScoreBoard';
import GameStats from './GameStats';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">NHL React</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/">Scoreboard</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container main-container">
            <Route exact path="/" component={ScoreBoard} />
            <Route path="/game/:id" component={GameStats} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
