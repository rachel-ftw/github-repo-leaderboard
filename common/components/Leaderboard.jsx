import React, { Component, PropTypes } from 'react'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard } = this.props

    if (leaderboard.isLoading) {
      return (
        <div className="display-3">
          Loading ...
          <br />
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      )
    } else {
      const mediaElements = leaderboard.leaders.map((leader, i) => {
        return (
          <div key={i} className="media">
            <a className="media-left" href={`https://github.com/${leader.login}`}>
              <img className="media-object" width="64" height="64" src={leader.avatar_url} alt={leader.login} />
            </a>
            <div className="media-body">
              <h4 className="media-heading">{leader.login}</h4>
              <p># of commits: {leader.count}</p>
            </div>
          </div>
        )
      })
      return <div>{mediaElements}</div>
    }
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}
