import React, { Component, PropTypes } from 'react'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard } = this.props
    console.log('leaderboard:', leaderboard)
    
    return (
      <div className="display-3">TODO: implement leaderboard</div>
    )
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}
