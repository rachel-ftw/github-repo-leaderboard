import { COMPUTE_LEADERBOARD_REQUEST, COMPUTE_LEADERBOARD_SUCCESS, COMPUTE_LEADERBOARD_FAILURE } from '../actions/computeLeaderboard'

const initialState = {
  leaders: [],
  isLoading: false,
}

export function leaderboard(state = initialState, action) {
  switch (action.type) {
  case COMPUTE_LEADERBOARD_REQUEST:
    return Object.assign({}, state, {
      isLoading: true,
    })
  case COMPUTE_LEADERBOARD_SUCCESS:
    return Object.assign({}, state, {
      leaders: action.leaders,
      isLoading: false,
    })
  case COMPUTE_LEADERBOARD_FAILURE:
    console.error('Compute leaderboard FAILURE:', action.error)
    return Object.assign({}, state, {
      leaders: [],
      isLoading: false,
    })
  default:
    return state
  }
}
