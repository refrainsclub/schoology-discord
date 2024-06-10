# Schoology Discord

Poll for new Schoology updates and push them to Discord.

We use Playwright for automating browser interactions (such as logging in and getting updates).

**Use this project at your own risk. I do not take responsibility for any damages you cause.**

## Environment Variables

These environment variables must be set up for the program to work.

| Name                  | Description                                        | Required |
|-----------------------|----------------------------------------------------|----------|
| SCHOOLOGY_EMAIL       | Schoology email address (or username)              | True     |
| SCHOOLOGY_PASSWORD    | Schoology password                                 | True     |
| SCHOOLOGY_LOGIN_URL   | Schoology login page                               | True     |
| SCHOOLOGY_UPDATES_URL | Schoology updates page                             | True     |
| DISCORD_WEBHOOK_URL   | Discord webhook URL (find in channel integrations) | True     |
| POLLER_INTERVAL       | How often to poll Schoology (in milliseconds)      | True     |

## Instructions

First you need to install the dependencies.

```bash
bun install
```

Then you can run the program.

```bash
bun run src/index.ts
```
