/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
import express from 'express'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'

const app = express.Router()

// The leaderboard API route
app.get('/leaderboard', (req, res) => {
  /* TODO: using isomorphic-fetch, retrieve a collection of commits to a repo from the
   * GitHub API (https://developer.github.com/v3/repos/commits/).

   https://api.github.com/repos/reactjs/redux/commits
   https://api.github.com/repos/:owner/:repo/commits
   *
   * Transform the data into an array structured like the one below,
   * where each element (object) contains data for each unique contributor.
   * Each object should contain the following properties:
   *   - avatar_url
   *   - login (username)
   *   - count (the total number of commits made by this author to the repo)
   *
   * For GitHub API authentication, set an auth header in your request:
   *
   * Authorization: Bearer <auth token (process.env.GITHUB_API_TOKEN)>

   [TypeError: Cannot read property 'papermana' of undefined]

   */
  const {owner, repo} = req.query

  const path = `https://api.github.com/repos/${owner}/${repo}/commits`
  fetch(path, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`
    }
  })
    .then(response => {
      if (response.status >= 400) {
        return response.json().then(body => {
          console.error(body)
          throw new Error('Bad response from server')
        })
      }

      return response
        .json()
        .then( allCommits => {
          let reducedCommits = allCommits.reduce((result, commit) => {
            const author = commit.author
            if (!result[author.login]) {
              result[author.login] = {
                avatar_url: author.avatar_url,
                login: author.login,
                count: 0
              }
            }
            result[author.login].count += 1
            return result
          }, {})

          reducedCommits = _.map(reducedCommits, value => value)
          reducedCommits = _.sortByOrder(reducedCommits, 'count', 'desc').slice(0, 5)

          return res.status(200).json(reducedCommits)
        })
    }).catch(err => {
      console.error(err)
      res.send(500).json(err)
    })
})

export default app
