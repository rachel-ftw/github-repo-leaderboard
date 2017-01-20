import fetch from 'isomorphic-fetch'
 

const fetchCommits = (owner, repo) => {
  const computeUrl = `https://api.github.com/repos/${owner}/${repo}/commits`
  return fetch(computeUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${process.env.GITHUB_API_TOKEN}`
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

export default fetchCommits