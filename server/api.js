import express from 'express'
import fetch from 'isomorphic-fetch'

/* eslint new-cap: [2, {"capIsNewExceptions": ["Router"]}] */
const app = express.Router()

// The app's leaderboard API route
app.get('/leaderboard', (req, res) => {
  /* TODO: using isomorphic-fetch, retrieve a collection of commits to a repo from the
   * GitHub API (https://developer.github.com/v3/repos/commits/).
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
   */

   process.env.GITHUB_API_TOKEN

  const owner = req.query.owner;
  const repo = req.query.repo;
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/commits'
  console.log(url);
  fetch(url, {
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_API_TOKEN
    }
  })
    .then(function(response) {
        if (response.status >= 400) {
            return response.json().then(data => {
              console.error(data);
              throw new Error("Bad response from server");
            })
        }
        return response.json();
    })
    .then(function(data) {
        var commits = {};
        for (var i = 0; i < data.length; i++) {
          var commit = data[i];
          var author = commit.author;
          if (!commit.author) {
            author = commit.committer;
          }
          if (author) {
            var author_login = author.login;
            var avatar_url = author.avatar_url;
            if (commits[author_login]) {
              commits[author_login].count += 1;
            } else {
              commits[author_login] = {avatar_url: avatar_url,
                                      count: 0};
            }
          } else {
            console.log(commit)
          }
        }
        console.log(commits);
        var leaders = []
        console.log(Object.keys(commits))
        for (i = 0; i < Object.keys(commits).length; i++) {
          var login = Object.keys(commits)[i];
          leaders.push({avatar_url: commits[login].avatar_url,
                        login: login,
                        count: commits[login].count
          })
        }
        console.log(leaders);

        res.status(200).json(leaders);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json(err);
    });

  /* const leaders2 = [{
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
  }] */

  // return this data in your response to the client's API request
  //res.status(200).json(leaders)
})

export default app
