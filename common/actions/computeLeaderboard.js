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

    // TODO: use isomorphic-fetch and /leaderboard API to compute leaders array
    const leaders = []
    dispatch(computeLeaderboardSuccess(leaders))
    fetch(computeUrl).then(response => {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
    }).then(data => {
      console.log(data)
      dispatch(computeLeaderboardSuccess(data))
    })

    // TODO: handle API errors
    // dispatch(computeLeaderboardFailure(error))
  }
}
