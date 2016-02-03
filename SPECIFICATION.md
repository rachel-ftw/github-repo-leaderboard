## Personas

- **Guest:** unauthenticated user

## User Stories

- [ ] As a Guest, I can visit the root route of the application, and see the leaderboard:
  - [ ] As a Guest, I can pass `owner` and `repo` arguments through the query string
  - [ ] As a Guest, so that I know whether or not my leaderboard is still being computed, I will see an "activity icon" and a "Please wait ..." message on the leaderboard route until the results are ready
  - [ ] As a Guest, when on the leaderboard route, once my results are ready I will see the avatar, username, and full name of the top 5 committers for the given repo in the past 7 days

## Requirements

- There are _no_ performance requirements for this application.
