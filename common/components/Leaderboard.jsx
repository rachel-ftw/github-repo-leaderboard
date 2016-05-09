import React, { Component, PropTypes } from 'react'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard: {isLoading, leaders} } = this.props
    console.log('isLoading:', isLoading)
    console.log('leaders:', leaders)

    if (isLoading) {
      return (
        <div className="loading">Please wait ...</div>
      )
    } else {
      const items = leaders.map(leader => {
        return (
          <li>
            <img src={leader.avatar_url}/>
            <span className="name">{leader.login}</span>
            <span className="count">{leader.count}</span>
          </li>
        )
      })

      return (
        <ul> {items} </ul>
      )
    }
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}

