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
      const summarizedCommits = commits.map(commit => {
        return {
          avatar_url: commit.committer.avatar_url,
          login: commit.committer.login,
        }
      })

      let committerInfo = {}
      for (let i in commits) {
        const commit = commits[i]
        const login = commit.committer.login
        const avatar_url = commit.committer.avatar_url
        let committer = committerInfo[login]
        if (!committer) {
          committer = committerInfo[login] = { avatar_url, login, count: 0 }
        }
        committer.count++
      }
      let leaders = _.sortBy(_.values(committerInfo), committer => -committer.count)
      if (leaders.length > 5) {
        leaders = leaders.slice(0, 5)
      }
      res.status(200).json(leaders)
    }).catch(error => res.status(500).json(error))
}
