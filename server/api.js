import express from 'express'
// import fetch from 'isomorphic-fetch'

/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const app = express.Router()

// The leaderboard API route
app.get('/leaderboard', (req, res) => {
  // TODO: use isomorphic-fetch and GitHub API (using process.env.GITHUB_API_TOKEN) to compute leaders array
  const leaders = [{
    avatar_url: 'https://avatars2.githubusercontent.com/u/810438?v=3&s=400',
    login: 'gaearon',
    count: 588,
  }, {
    avatar_url: 'https://avatars3.githubusercontent.com/u/17882?v=3&s=400',
    login: 'timdorr',
    count: 43,
  }, {
    avatar_url: 'https://avatars1.githubusercontent.com/u/6018379?v=3&s=400',
    login: 'ellbee',
    count: 36,
  }]
  res.status(200).json(leaders)
})

export default app
