import React, { Component } from 'react';
import '../styles/BoxScore.css';
import SkaterTable from './SkaterTable';
import GoalieTable from './GoalieTable';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleNotch)

class BoxScore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      boxScore: null
    }
  }

  componentDidMount() {
    // Load today's games from NHL schedule endpoint
    fetch("http://statsapi.web.nhl.com/api/v1/game/"+this.props.match.params.id+"/boxscore")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            boxScore: result
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, boxScore } = this.state

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <div className="text-center">
          <FontAwesomeIcon icon="circle-notch" className="fa-spin app-spinner"/>
        </div>
      )
    } else if (boxScore){
      return (
        <div className="BoxScore">
          <div>
            <div className="row">
              <div className="col-lg-6">
                <div className="TeamName">
                  <h1>
                    {boxScore.teams.away.team.name}
                    <span className="float-right">{boxScore.teams.away.teamStats.teamSkaterStats.goals}</span>
                  </h1>
                </div>
                <SkaterTable team={boxScore.teams.away} />
                <GoalieTable team={boxScore.teams.away} />
              </div>
              <div className="col-lg-6">
                <div className="TeamName">
                  <h1>
                    {boxScore.teams.home.team.name}
                    <span className="float-right">{boxScore.teams.home.teamStats.teamSkaterStats.goals}</span>
                  </h1>
                </div>
                <SkaterTable team={boxScore.teams.home} />
                <GoalieTable team={boxScore.teams.home} />
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
}

export default BoxScore;
