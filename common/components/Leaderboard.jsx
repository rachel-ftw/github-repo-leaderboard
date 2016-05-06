import React, { Component, PropTypes } from 'react'

import styles from './Leaderboard.css'

export default class Leaderboard extends Component {
  render() {
    const { leaderboard: {isLoading, leaders} } = this.props
    console.log('isLoading:', isLoading)
    console.log('leaders:', leaders)

    const renderedLeaders = leaders.map((leader, i) => {
      return (
        <div key={i}>
          <img src={leader.avatar_url}/>
          <span className={styles.login}> {leader.login}</span>
          <span className={styles.count}> ({leader.count})</span>
        </div>
      )
    })

    return isLoading ? (
      <div>Loading ...</div>
    ) : (
      <div>{renderedLeaders}</div>
    )
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}
