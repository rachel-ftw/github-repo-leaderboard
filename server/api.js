import express from 'express'
import fetch from 'isomorphic-fetch'

/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const app = express.Router()

// The leaderboard API route
app.get('/leaderboard', (req, res) => {
  // TODO: use isomorphic-fetch and GitHub API (using process.env.GITHUB_API_TOKEN) to compute leaders array
  const {owner, repo} = req.query
  const ghUrl = `https://api.github.com/repos/${owner}/${repo}/commits`

  fetch(ghUrl)
    .then(resp => resp.json())
    .then(commits => {
      const leaderMap = commits.reduce((leaderMap, commit) => {
        if (!leaderMap[commit.author.login]) {
          leaderMap[commit.author.login] = {
            avatar_url: commit.author.avatar_url,
            login: commit.author.login,
            count: 0,
          }
        }
        leaderMap[commit.author.login].count++

        return leaderMap
      }, {})

      const leaders = Object.keys(leaderMap)
        .map(login => leaderMap[login])
        .sort((authorA, authorB) => authorB.count - authorA.count)
        .slice(0, 5)

      res.status(200).json(leaders)
    })
    .catch(error => res.status(500).send(error))
})

export default app
