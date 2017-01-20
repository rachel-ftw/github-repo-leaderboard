/* global __CLIENT__ */
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
    const owner = (url.query && url.query.owner) || 'reactjs'
    const repo = (url.query && url.query.repo) || 'redux'
    const computePath = `/leaderboard?owner=${owner}&repo=${repo}`
    const baseUrl = __CLIENT__ ? '' : process.env.APP_BASEURL
    const computeUrl = `${baseUrl}${computePath}`
    dispatch(computeLeaderboardRequest())
    fetch(computeUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(leaders => dispatch(computeLeaderboardSuccess(leaders)))
      .catch(err => {
        console.error(err)
        dispatch(computeLeaderboardFailure(error))
      })
  }
}
