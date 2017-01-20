import React, { Component, PropTypes } from 'react'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard: {isLoading, leaders} } = this.props
    console.log('isLoading:', isLoading)
    console.log('leaders:', leaders)

    return (
      <div className="display-3">TODO: implement leaderboard 2</div>
    )
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}
