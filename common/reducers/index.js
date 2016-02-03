import { combineReducers } from 'redux'

import { routeReducer } from 'redux-simple-router'

import { leaderboard } from './leaderboard'

const rootReducer = combineReducers({
  routing: routeReducer,
  leaderboard,
})

export default rootReducer
