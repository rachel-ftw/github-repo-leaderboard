import express from 'express'
import fetch from 'isomorphic-fetch'

/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const app = express.Router()

function getDesiredParams(commits) {
  var authorMap = {}
  var leaders = []
  commits.forEach(function (el, idx, arr) {
    if (el.committer.login in authorMap) {
      authorMap[el.committer.login].count += 1
    }
    else {
      authorMap[el.committer.login] = {
        count: 1,
        avatar_url: el.committer.avatar_url,
        login: el.committer.login
      }
    }
  })

  Object.keys(authorMap).forEach(function (el, idx, arr) {
    leaders.push(authorMap[el])
  })

  leaders.sort(function (a, b) {
    return b.count - a.count
  })

  console.log(leaders)
  return leaders
}

// The leaderboard API route
app.get('/leaderboard', (req, res) => {
  // TODO: use isomorphic-fetch and GitHub API (using process.env.GITHUB_API_TOKEN) to compute leaders array
  const {owner, repo} = req.query
  const ghUrl = `https://api.github.com/repos/${owner}/${repo}/commits`
  var ghData = fetch(ghUrl)
    .then(r => r.json())
    .then(r => res.status(200).json(getDesiredParams(r)))

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
})


export default app

