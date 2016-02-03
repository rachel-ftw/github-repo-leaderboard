// import fetch from 'isomorphic-fetch'
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
    const owner = (url.query && url.query.owner) || 'LearnersGuild'
    const repo = (url.query && url.query.repo) || 'learning-os'
    dispatch(computeLeaderboardRequest())
    // TODO: use isomorphic-fetch and /leaderboard API to compute leaders array
    const leaders = []
    dispatch(computeLeaderboardSuccess(leaders))
    // TODO: handle API errors
    // dispatch(computeLeaderboardFailure(error))
  }
}
