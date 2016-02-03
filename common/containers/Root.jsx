import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import computeLeaderboard from '../actions/computeLeaderboard'

import Leaderboard from '../components/Leaderboard'

import styles from './Root.scss'


export class Root extends Component {
  componentDidMount() {
    this.constructor.fetchData(this.props.dispatch)
  }

  static fetchData(dispatch) {
    dispatch(computeLeaderboard())
  }

  render() {
    const { leaderboard, dispatch } = this.props

    return (
      <div className={styles.root}>
        <div className="row">
          <section className={styles.content}>
            <Leaderboard leaderboard={leaderboard} />
          </section>
        </div>
      </div>
    )
  }
}

Root.propTypes = {
  leaderboard: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    leaders: PropTypes.array,
  }),
}

function select(state) {
  return {
    leaderboard: state.leaderboard,
  }
}

export default connect(select)(Root)
