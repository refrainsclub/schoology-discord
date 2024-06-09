import type { UpdateRealm } from "../schoology/types";

declare module "bun" {
  interface Env {
    // Schoology
    SCHOOLOGY_BASE_URL?: string;
    SCHOOLOGY_KEY: string;
    SCHOOLOGY_SECRET: string;
    SCHOOLOGY_UPDATE_REALM: UpdateRealm;

    // Discord
    DISCORD_TOKEN: string;
    DISCORD_CHANNEL_ID: string;
  }
}
