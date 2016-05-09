import express from 'express'
import fetch from 'isomorphic-fetch'

/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const app = express.Router()

// The leaderboard API route
app.get('/leaderboard', (req, res) => {
  // TODO: use isomorphic-fetch and GitHub API (using process.env.GITHUB_API_TOKEN) to compute leaders array
  const owner = req.query.owner
  const repo = req.query.repo
  const githubUrl = `https://api.github.com/repos/${owner}/${repo}/commits`

  console.log(githubUrl)
  fetch(githubUrl)
    .then(resp => resp.json())
    .then(commits => {
      let authors = {}
      let leaders = []

      commits.forEach(commit => {
        const login = commit.author.login
        if (!authors.hasOwnProperty(login)) {
          authors[login] = {
            count: 0,
            avatar_url: commit.author.avatar_url,
            login: commit.author.login
          }
        }
        authors[login].count++
      })

      for (let login in authors) {
        leaders.push(authors[login])
      }
      return leaders.sort((a, b) => {
        if (a.count < b.count) {
          return 1
        }
        if (b.count < a.count) {
          return -1
        }
        return 0
      })
    })
    .then(leaders => {
      res.status(200).json(leaders.slice(0, 3))
    })
    .catch(error => {
      res.status(500).send()
    })

})

export default app

