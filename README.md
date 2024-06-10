# Schoology Discord

Poll for new Schoology updates and push them to Discord.

We use Playwright for automating browser interactions (such as logging in and getting updates).

**Use this project at your own risk. I do not take responsibility for any damages you cause.**

## Environment Variables

These environment variables must be set up for the program to work.

| Name                    | Description                                        | Required |
|-------------------------|----------------------------------------------------|----------|
| `SCHOOLOGY_EMAIL`       | Schoology email address (or username)              | `true`   |
| `SCHOOLOGY_PASSWORD`    | Schoology password                                 | `true`   |
| `SCHOOLOGY_LOGIN_URL`   | Schoology login page                               | `true`   |
| `SCHOOLOGY_UPDATES_URL` | Schoology updates page                             | `true`   |
| `DISCORD_WEBHOOK_URL`   | Discord webhook URL (find in channel integrations) | `true`   |
| `POLLER_INTERVAL`       | How often to poll Schoology (in milliseconds)      | `true`   |

## Instructions

First you need to install the dependencies.

```bash
bun install
```

Then you can run the program.

```bash
bun run src/index.ts
```
