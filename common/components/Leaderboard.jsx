import React, { Component, PropTypes } from 'react'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard: {isLoading, leaders} } = this.props
    console.log('isLoading:', isLoading)
    console.log('leaders:', leaders)

    var list = [];
    for (var i = 0; i < leaders.length; i++) {
      var leader = leaders[i];
      list.push(<li><a href={leader.avatar_url}>{leader.login}</a> {leader.count}</li>)
    }

    return (
      <div className="display-3">
        <div>
          <ul>
          {list}
          </ul>
        </div>
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
