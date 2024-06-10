declare module "bun" {
  interface Env {
    SCHOOLOGY_EMAIL: string;
    SCHOOLOGY_PASSWORD: string;
    SCHOOLOGY_LOGIN_URL: string;
    SCHOOLOGY_UPDATES_URL: string;
    DISCORD_WEBHOOK_URL: string;
    POLLER_INTERVAL: number;
  }
}
