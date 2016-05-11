import React, { Component, PropTypes } from 'react'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard: {isLoading, leaders} } = this.props
    console.log('isLoading:', isLoading)
    console.log('leaders:', leaders)

    return (
      <div className="main">
        {
          leaders.map(function (leader) {
            return (
              <div className="leaderItem">
                <img src={leader.avatar_url}></img>
                <div className="login">{leader.login}</div>
                <div className="count">{leader.count}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}

