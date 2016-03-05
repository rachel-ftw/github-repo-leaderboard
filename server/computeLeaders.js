import fetch from 'isomorphic-fetch'
import _ from 'lodash'

const fetchOpts = {
  method: 'GET',
  headers: {
    Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    Accept: 'application/json',
  },
}

function getCommittersForRepo(owner, repo) {
  let since = new Date()
  since.setDate(since.getDate() - 7)
  return fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=${since.toISOString()}`, fetchOpts)
    .then(resp => resp.json())
}

export default function computeLeaders(req, res) {
  const owner = (req.query && req.query.owner) || 'LearnersGuild'
  const repo = (req.query && req.query.repo) || 'learning-os'

  getCommittersForRepo(owner, repo)
    .then(commits => {
      const leaders = commits
        // filter out commits with no author
        .filter(commit => !!commit.author && !!commit.author.login)
        // sort by login to cluster the commits
        .sort((prev, curr) => {
          if (prev.author.login < curr.author.login) {
            return -1
          } else if (prev.author.login > curr.author.login) {
            return 1
          } else {
            return 0
          }
        })
        // count commits per author
        .reduce((lastReduce, commit) => {
          const next = lastReduce.slice(0)
          const leader = next[next.length - 1]
          if (!leader || leader.login !== commit.author.login) {
            next.push({
              login: commit.author.login,
              avatar_url: commit.author.avatar_url,
              count: 1,
            })
          } else {
            leader.count++
          }
          return next
        }, [])
        // sort descending by number of commits
        .sort((prev, curr) => curr.count - prev.count)
        // return top 5
        .slice(0, 5)

      res.status(200).json(leaders)
    })
    .catch(error => res.status(500).json(error))
}
