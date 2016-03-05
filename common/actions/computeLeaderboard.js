import fetch from 'isomorphic-fetch'
import parseUrl from 'url-parse'

export const COMPUTE_LEADERBOARD_REQUEST = 'COMPUTE_LEADERBOARD_REQUEST'
export const COMPUTE_LEADERBOARD_SUCCESS = 'COMPUTE_LEADERBOARD_SUCCESS'
export const COMPUTE_LEADERBOARD_FAILURE = 'COMPUTE_LEADERBOARD_FAILURE'

function computeLeaderboardRequest() {
  return { type: COMPUTE_LEADERBOARD_REQUEST }
}

function computeLeaderboardSuccess(leaders) {
  return { type: COMPUTE_LEADERBOARD_SUCCESS, leaders }
}

function computeLeaderboardFailure(error) {
  return { type: COMPUTE_LEADERBOARD_FAILURE, error }
}

export default function computeLeaderboard() {
  return (dispatch, getState) => {
    const path = getState().routing.path || '/'
    const url = parseUrl(path, true)
    const owner = (url.query && url.query.owner) || 'facebook'
    const repo = (url.query && url.query.repo) || 'react'
    dispatch(computeLeaderboardRequest())
    fetch(`http://localhost:9090/leaderboard?owner=${owner}&repo=${repo}`)
      .then(resp => resp.json())
      .then(leaders => dispatch(computeLeaderboardSuccess(leaders)))
      .catch(error => dispatch(computeLeaderboardFailure(error)))
  }
}
