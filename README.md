# github-repo-leaderboard

This is a simple web application that will display the "top committers in past week" leaderboard for a given GitHub repository. It uses the [GitHub Commits API][github-commits-api] to achieve its functionality.

It is built using:

- ES2015
- React.js
- redux
- webpack


## [Project Specification](SPECIFICATION.md)

## Getting Started

Be sure you've read the [instructions for contributing](./CONTRIBUTING.md).

1. Clone the repository.
2. Set your NODE_ENV environment variable:

        $ export NODE_ENV=development

3. Create your `.env` file for your environment, e.g.:

        PORT=9090
        APP_BASEURL=http://localhost:9090
        ICONS_SERVICE_TAGS_API_URL=https://icons.learnersguild.org/tags
        GITHUB_API_TOKEN=857aa3242bd816b3e596824552a5620fddaf975a

4. Run the server:

        $ npm install
        $ npm start

5. Visit the server in your browser:

        $ open http://localhost:9090


## License

See the [LICENSE](./LICENSE) file.


<!-- external resources -->

[github-commits-api]: https://developer.github.com/v3/repos/commits/
